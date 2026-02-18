import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resendApiKey = process.env.RESEND_API_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Use Service Role key on the server to bypass RLS, fallback to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export async function POST(request: Request) {
    if (!resendApiKey || resendApiKey === 're_your_api_key_here') {
        console.error("Missing RESEND_API_KEY in environment variables.");
        return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);
    const supabase = createClient(supabaseUrl, supabaseKey);

    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // 1. Store in Supabase
        const { data: userData, error: dbError } = await supabase
            .from('waitlist')
            .insert([{ email, email_sent: false }])
            .select()
            .single();

        if (dbError) {
            // Check if it's a duplicate email error (Postgres code 23505)
            if (dbError.code === '23505') {
                return NextResponse.json({
                    success: true,
                    message: "You're already on the list!"
                });
            }
            console.error("Database error:", dbError);
            return NextResponse.json({ error: "Failed to save to database" }, { status: 500 });
        }

        // 2. Send notification to OWNER (you)
        try {
            await resend.emails.send({
                from: 'PlaceIndex Waitlist <notifications@placeindex.online>',
                to: 'ameysawant@placeindex.online',
                subject: 'New Waitlist Signup!',
                html: `<p>New user signed up for the waitlist: <strong>${email}</strong></p>`
            });
        } catch (emailError) {
            console.error("Owner notification failed:", emailError);
        }

        // 3. Send "Thank You" email to the USER
        try {
            await resend.emails.send({
                from: 'PlaceIndex <onboarding@placeindex.online>',
                to: email,
                subject: 'Welcome to the PlaceIndex Waitlist',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #000;">Welcome to the Inner Circle</h2>
                        <p>Hi there,</p>
                        <p>Thanks for joining the waitlist for <strong>PlaceIndex</strong>. We're building the first standardized benchmark system for real estate investment intelligence.</p>
                        <p><strong>What's next?</strong></p>
                        <ul>
                            <li>You'll get early access to our neighborhood scoring dashboard.</li>
                            <li>Weekly market intelligence reports on emerging localities.</li>
                            <li>Exclusive invites to our beta launch.</li>
                        </ul>
                        <p>Stay tuned — we're excited to have you with us.</p>
                        <br />
                        <p>Best,<br />The PlaceIndex Team</p>
                    </div>
                `
            });

            // 4. Update status in DB as fully processed
            await supabase
                .from('waitlist')
                .update({ email_sent: true })
                .eq('id', userData.id);

        } catch (emailError) {
            console.error("User confirmation email failed:", emailError);
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
