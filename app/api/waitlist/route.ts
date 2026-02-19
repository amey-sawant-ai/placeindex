import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const resendApiKey = process.env.RESEND_API_KEY || '';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';

    // Support both old anon key format (eyJ...) and new publishable key format (sb_publishable_...)
    const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '';

    const ownerEmail = process.env.EMAIL || '';

    // ── ENV Guard ─────────────────────────────────────────────────────────────
    if (!resendApiKey) {
        console.error('[waitlist] Missing RESEND_API_KEY');
        return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
    }
    if (!supabaseUrl || !supabaseKey) {
        console.error('[waitlist] Missing Supabase config. URL:', !!supabaseUrl, 'Key:', !!supabaseKey);
        return NextResponse.json({ error: 'Missing Supabase config' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    let email: string;
    try {
        const body = await request.json();
        email = (body.email || '').trim().toLowerCase();
    } catch {
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // ── 1. Save to Supabase via REST API ──────────────────────────────────────
    let rowId: string | null = null;

    try {
        const dbRes = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
            method: 'POST',
            headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation',
            },
            body: JSON.stringify({ email, email_sent: false }),
        });

        const dbText = await dbRes.text();

        if (!dbRes.ok) {
            if (dbText.includes('23505')) {
                // Duplicate — still send email attempt, just return early with a friendly message
                console.log('[waitlist] Duplicate email detected:', email);
                return NextResponse.json({ success: true, message: "You're already on the list!" });
            }
            console.error('[waitlist] Supabase insert failed:', dbRes.status, dbText);
            // Don't return error — still attempt to send emails below
        } else {
            try {
                const rows = JSON.parse(dbText);
                rowId = rows?.[0]?.id ?? null;
            } catch { /* ignore */ }
        }
    } catch (dbErr) {
        console.error('[waitlist] Supabase fetch error:', dbErr);
        // Continue to send emails even if DB fails
    }

    // ── 2. Notify owner (plain, direct — goes to Primary inbox) ───────────────
    if (ownerEmail) {
        try {
            const ownerRes = await resend.emails.send({
                from: 'PlaceIndex <contact@placeindex.online>',
                to: [ownerEmail],
                replyTo: email,
                subject: `New signup: ${email}`,
                text: `Hi,\n\nA new user just joined the PlaceIndex waitlist.\n\nEmail: ${email}\n\n— PlaceIndex`,
                html: `<p>Hi,</p><p>A new user just joined the PlaceIndex waitlist.</p><p><strong>${email}</strong></p><p>— PlaceIndex</p>`,
            });
            console.log('[waitlist] Owner email sent:', ownerRes);
        } catch (err) {
            console.error('[waitlist] Owner email error:', err);
        }
    }

    // ── 3. Welcome email to subscriber (transactional style) ──────────────────
    try {
        const welcomeRes = await resend.emails.send({
            from: 'Amey from PlaceIndex <contact@placeindex.online>',
            to: [email],
            replyTo: ownerEmail || 'contact@placeindex.online',
            subject: 'You are on the waitlist',
            // Plain text version — key for Primary inbox routing
            text: `Hi,\n\nThanks for joining the PlaceIndex waitlist. We're building the first standardized benchmark system for real estate investment intelligence.\n\nWhat to expect:\n- Early access to our neighborhood scoring dashboard\n- Weekly market intelligence reports\n- Exclusive beta invites\n\nWe'll be in touch soon.\n\nAmey\nPlaceIndex`,
            html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#fff;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:40px auto;padding:0 20px">
    <tr><td>
      <p style="font-size:15px;color:#111;line-height:1.6;margin:0 0 16px">Hi,</p>
      <p style="font-size:15px;color:#111;line-height:1.6;margin:0 0 16px">
        Thanks for joining the <strong>PlaceIndex</strong> waitlist. We're building the first
        standardized benchmark system for real estate investment intelligence.
      </p>
      <p style="font-size:15px;color:#111;line-height:1.6;margin:0 0 8px"><strong>What to expect:</strong></p>
      <ul style="font-size:15px;color:#333;line-height:1.9;margin:0 0 16px;padding-left:20px">
        <li>Early access to our neighborhood scoring dashboard</li>
        <li>Weekly market intelligence reports on emerging localities</li>
        <li>Exclusive invites to our beta launch</li>
      </ul>
      <p style="font-size:15px;color:#111;line-height:1.6;margin:0 0 32px">
        We'll be in touch soon.
      </p>
      <p style="font-size:15px;color:#111;margin:0">Amey</p>
      <p style="font-size:13px;color:#888;margin:4px 0 0">PlaceIndex &mdash; <a href="https://placeindex.online" style="color:#888">placeindex.online</a></p>
    </td></tr>
  </table>
</body>
</html>
            `,
        });

        console.log('[waitlist] Welcome email sent:', welcomeRes);

        // ── 4. Mark email_sent = true ─────────────────────────────────────────
        if (rowId) {
            const supabaseKeyForUpdate =
                process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                '';

            await fetch(`${supabaseUrl}/rest/v1/waitlist?id=eq.${rowId}`, {
                method: 'PATCH',
                headers: {
                    'apikey': supabaseKeyForUpdate,
                    'Authorization': `Bearer ${supabaseKeyForUpdate}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_sent: true }),
            });
        }
    } catch (err) {
        console.error('[waitlist] Welcome email error:', err);
        // Return success anyway — user was added to waitlist even if email fails
    }

    return NextResponse.json({ success: true });
}
