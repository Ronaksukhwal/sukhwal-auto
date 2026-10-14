import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS support
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, email, message' });
  }

  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'ronaksukhwal5@gmail.com';
  const smtpUser = process.env.SMTP_USER || 'ronaksukhwal5@gmail.com';
  const smtpPass = (process.env.SMTP_PASSWORD || 'hxmzsbljminnxprb').replace(/\s+/g, '');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Admin Notification Email HTML
  const adminSubject = `[Contact Form Inquiry] From ${name}`;
  const adminHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #1a1315; background-color: #fffdf5; padding: 20px;">
        <h2 style="color: #31050b; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">New Contact Inquiry</h2>
        <p>A customer has submitted a message via the website contact form:</p>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 10px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2; width: 140px;">Name</td><td style="padding: 10px; border: 1px solid #e91e63;">${name}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Email</td><td style="padding: 10px; border: 1px solid #e91e63;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding: 10px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Message</td><td style="padding: 10px; border: 1px solid #e91e63; white-space: pre-wrap;">${message}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 0.85rem; color: #4e4548;">Sukhwal Auto Services Admin Notification</p>
      </body>
    </html>
  `;

  // Customer Auto-reply Confirmation Email HTML
  const customerSubject = `We received your message - Sukhwal Auto Services`;
  const customerHtml = `
    <html>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 36px 30px; text-align: center;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 14px;">
                      Inquiry Received
                    </span>
                    <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; text-transform: uppercase;">
                      SUKHWAL AUTO SERVICES
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #ffe4e6; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                      Hero MotoCorp &amp; Hero Honda Specialists - Bhilwara
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 36px 30px;">
                    <h2 style="margin-top: 0; margin-bottom: 12px; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Hello ${name},
                    </h2>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; background-color: #fff1f2; border-left: 4px solid #e11d48; border-radius: 8px;">
                      <tr>
                        <td style="padding: 16px 20px;">
                          <p style="margin: 0; font-size: 15px; line-height: 24px; color: #334155;">
                            Thank you for reaching out to us. We have received your message and Mr. Gopal Sukhwal or our technical team will contact you shortly.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #475569;">
                      <strong>Your inquiry details:</strong>
                    </p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 26px; background-color: #fafafa; border-radius: 8px; border: 1px solid #f1f5f9;">
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; font-weight: 600; color: #64748b; width: 120px;">Name</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; color: #0f172a;">${name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; font-weight: 600; color: #64748b;">Email</td>
                        <td style="padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13.5px; color: #0f172a;">${email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 16px; font-size: 13.5px; font-weight: 600; color: #64748b; vertical-align: top;">Message</td>
                        <td style="padding: 12px 16px; font-size: 13.5px; color: #0f172a; white-space: pre-wrap; line-height: 1.5;">${message}</td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 22px; color: #475569;">
                      For urgent inquiries or roadside support, feel free to call our workshop directly:
                      <br>
                      <strong>Phone:</strong> <a href="tel:+919413757303" style="color: #e11d48; text-decoration: none; font-weight: bold;">+91 94137 57303</a> / <a href="tel:+919461524500" style="color: #e11d48; text-decoration: none; font-weight: bold;">+91 94615 24500</a>
                    </p>

                    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #475569;">
                      Best Regards,<br>
                      <strong>Gopal Sukhwal &amp; Team</strong><br>
                      Sukhwal Auto Services, Bhilwara
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #f1f5f9; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                      Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001) | &copy; 2000 - 2026 Sukhwal Auto Services.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Dispatch both emails in parallel
  const sendAdmin = transporter.sendMail({
    from: `"Sukhwal Auto Services" <${smtpUser}>`,
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
    replyTo: email,
  });

  const sendCustomer = transporter.sendMail({
    from: `"Sukhwal Auto Services" <${smtpUser}>`,
    to: email,
    subject: customerSubject,
    html: customerHtml,
  });

  try {
    const results = await Promise.allSettled([sendAdmin, sendCustomer]);
    console.log('[VERCEL CONTACT EMAIL RESULTS]', results);

    // Also forward asynchronously to Render backend to store in DB
    const renderApiUrl = process.env.RENDER_API_URL || 'https://sukhwal-auto-backend.onrender.com';
    fetch(`${renderApiUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    }).catch(err => console.warn('Render DB sync error:', err.message));

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted and confirmation emails dispatched successfully.'
    });
  } catch (error) {
    console.error('[VERCEL CONTACT ERROR]', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch emails' });
  }
}
