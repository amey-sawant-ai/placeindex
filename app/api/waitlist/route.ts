import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || apiKey === 're_your_api_key_here') {
        console.error("Missing RESEND_API_KEY in environment variables.");
        return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
    }

    const resend = new Resend(apiKey);

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

        // 2. Send an email to the USER (you)
        try {
            await resend.emails.send({
                from: 'PlaceIndex Waitlist <notifications@placeindex.online>',
                to: 'ameysawant@placeindex.online',
                subject: 'New Waitlist Signup!',
                html: `<p>New user signed up for the waitlist: <strong>${email}</strong></p>`
            });

            // 3. Update status in DB
            await supabase
                .from('waitlist')
                .update({ email_sent: true })
                .eq('id', userData.id);

        } catch (emailError) {
            console.error("Email notification failed:", emailError);
        }


        // 2. (Optional) Send a confirmation to the user who signed up
        /*
        await resend.emails.send({
            from: 'PlaceIndex <onboarding@placeindex.online>',
            to: email,
            subject: 'Welcome to the PlaceIndex Waitlist',
            html: '<p>Thanks for joining our waitlist! We will notify you as soon as we launch.</p>'
        });
        */

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Email error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
