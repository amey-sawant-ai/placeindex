import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const resendApiKey = process.env.RESEND_API_KEY || '';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey =
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        '';
    const ownerEmail = process.env.EMAIL || 'amey123sawant@gmail.com';

    if (!resendApiKey) {
        console.error('[waitlist] Missing RESEND_API_KEY');
        return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    // ── Parse body ────────────────────────────────────────────────────────────
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

    console.log('[waitlist] Processing signup for:', email);

    // ── 1. Save to Supabase (best-effort, never blocks email) ─────────────────
    let alreadyExists = false;
    if (supabaseUrl && supabaseKey) {
        try {
            const dbRes = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
                method: 'POST',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal',
                },
                body: JSON.stringify({ email }),
            });
            const dbText = await dbRes.text();
            if (dbText.includes('23505')) {
                alreadyExists = true;
                console.log('[waitlist] Duplicate email:', email);
            } else if (!dbRes.ok) {
                console.warn('[waitlist] DB insert failed (non-fatal):', dbRes.status, dbText);
            } else {
                console.log('[waitlist] DB insert success');
            }
        } catch (dbErr) {
            console.warn('[waitlist] DB error (non-fatal):', dbErr);
        }
    }

    if (alreadyExists) {
        return NextResponse.json({ success: true, message: "You're already on the list!" });
    }

    // ── 2. Welcome email to user ──────────────────────────────────────────────
    // Skill guidelines: inverted pyramid, single CTA, plain text ratio,
    // bulletproof table layout, 600px max, 14-16px body, unsubscribe link
    const welcomeHtml = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Welcome to PlaceIndex</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">

  <!-- Preview text (hidden) -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    You're on the list — here's what happens next with PlaceIndex.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- Outer wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background-color:#ffffff;border-radius:8px;overflow:hidden;border:1px solid #e4e4e7;">

          <!-- Header banner -->
          <tr>
            <td style="background-color:#000000;padding:32px 40px 28px;">
              <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:3px;color:rgba(255,255,255,0.4);font-family:Arial,Helvetica,sans-serif;">Research Initiative</p>
              <h1 style="margin:6px 0 0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;font-family:Arial,Helvetica,sans-serif;">PlaceIndex</h1>
              <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.45);font-family:Arial,Helvetica,sans-serif;">The S&amp;P 500 for Neighborhoods</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <p style="margin:0 0 8px;font-size:15px;color:#111111;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">Hi,</p>
              <p style="margin:0 0 20px;font-size:15px;color:#333333;line-height:1.7;font-family:Arial,Helvetica,sans-serif;">
                You're on the <strong>PlaceIndex waitlist</strong>. We're building the first standardized
                benchmark system for Indian real estate — turning fragmented property data into
                objective, comparable investment signals.
              </p>
              <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#111111;text-transform:uppercase;letter-spacing:0.5px;font-family:Arial,Helvetica,sans-serif;">What to expect:</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#444444;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
                    📊&nbsp;&nbsp;Early access to our neighborhood scoring dashboard
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#444444;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
                    📈&nbsp;&nbsp;Weekly market intelligence reports on emerging localities
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;font-size:14px;color:#444444;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
                    🎯&nbsp;&nbsp;Exclusive beta invites before public launch
                  </td>
                </tr>
              </table>

              <!-- CTA Button — bulletproof table method -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 28px;">
                <tr>
                  <td align="center" bgcolor="#000000" style="border-radius:6px;">
                    <a href="https://placeindex.online" target="_blank"
                       style="font-size:15px;font-family:Arial,Helvetica,sans-serif;color:#ffffff;
                              text-decoration:none;padding:13px 32px;display:inline-block;
                              font-weight:700;letter-spacing:0.2px;white-space:nowrap;">
                      Visit PlaceIndex →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:15px;color:#111111;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">Talk soon,</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:700;color:#111111;font-family:Arial,Helvetica,sans-serif;">Amey</p>
              <p style="margin:2px 0 0;font-size:13px;color:#888888;font-family:Arial,Helvetica,sans-serif;">PlaceIndex</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px 28px;background-color:#fafafa;border-top:1px solid #eeeeee;">
              <p style="margin:0;font-size:12px;color:#999999;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">
                You received this because you signed up at
                <a href="https://placeindex.online" style="color:#999999;">placeindex.online</a>.<br />
                To unsubscribe, reply to this email with "unsubscribe" in the subject line.
              </p>
            </td>
          </tr>

        </table>
        <!-- /Email card -->

      </td>
    </tr>
  </table>
  <!-- /Outer wrapper -->

</body>
</html>`;

    const welcomeText = `Hi,

You're on the PlaceIndex waitlist.

We're building the first standardized benchmark system for Indian real estate — turning fragmented property data into objective, comparable investment signals.

What to expect:
- Early access to our neighborhood scoring dashboard
- Weekly market intelligence reports on emerging localities  
- Exclusive beta invites before public launch

Visit us at: https://placeindex.online

Talk soon,
Amey
PlaceIndex

---
You received this because you signed up at placeindex.online.
To unsubscribe, reply with "unsubscribe" in the subject line.`;

    try {
        const welcomeRes = await resend.emails.send({
            from: 'Amey from PlaceIndex <contact@placeindex.online>',
            to: [email],
            replyTo: ownerEmail,
            subject: 'You\'re on the PlaceIndex waitlist',
            text: welcomeText,
            html: welcomeHtml,
            headers: {
                'List-Unsubscribe': '<mailto:contact@placeindex.online?subject=unsubscribe>',
                'X-Entity-Ref-ID': `waitlist-${Date.now()}`,
            },
        });
        console.log('[waitlist] Welcome email response:', JSON.stringify(welcomeRes?.data));
        if (welcomeRes?.error) {
            console.error('[waitlist] Welcome email error from Resend:', welcomeRes.error);
        }
    } catch (err) {
        console.error('[waitlist] Welcome email exception:', err);
    }

    // ── 3. Owner notification ─────────────────────────────────────────────────
    try {
        const ownerRes = await resend.emails.send({
            from: 'PlaceIndex Signups <contact@placeindex.online>',
            to: [ownerEmail],
            replyTo: email,
            subject: `New waitlist signup: ${email}`,
            text: `New waitlist signup\n\nEmail: ${email}\nTime: ${new Date().toISOString()}\n\n— PlaceIndex`,
            html: `<p style="font-family:Arial,sans-serif;font-size:15px;color:#111;">New waitlist signup:</p>
<p style="font-family:monospace;font-size:16px;color:#000;background:#f4f4f4;padding:12px 16px;border-radius:4px;">${email}</p>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#888;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>`,
        });
        console.log('[waitlist] Owner notification response:', JSON.stringify(ownerRes?.data));
        if (ownerRes?.error) {
            console.error('[waitlist] Owner email error:', ownerRes.error);
        }
    } catch (err) {
        console.error('[waitlist] Owner email exception:', err);
    }

    return NextResponse.json({ success: true });
}
