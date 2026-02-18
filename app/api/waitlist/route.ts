import { Resend } from 'resend';
import { NextResponse } from 'next/server';

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

        // 1. Send an email to the USER (you)
        await resend.emails.send({
            from: 'PlaceIndex Waitlist <notifications@placeindex.online>', // Note: Needs domain verification on Resend
            to: 'ameysawant@placeindex.online',
            subject: 'New Waitlist Signup!',
            html: `<p>New user signed up for the waitlist: <strong>${email}</strong></p>`
        });

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
