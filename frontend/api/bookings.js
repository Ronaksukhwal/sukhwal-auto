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

  const {
    customer_name,
    customer_phone,
    customer_email,
    bike_model,
    service_type,
    booking_date,
    booking_time,
    needs_pickup,
    pickup_address,
    drop_address,
    special_instructions
  } = req.body || {};

  if (!customer_name || !customer_phone || !customer_email || !bike_model || !service_type || !booking_date || !booking_time) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
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

  const bookingRef = Math.floor(1000 + Math.random() * 9000);

  // Admin Notification Email
  const adminSubject = `[New Booking Alert] Sukhwal Auto - #${bookingRef} (${customer_name})`;
  const adminHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; color: #1a1315; background-color: #fffdf5; padding: 20px;">
        <h2 style="color: #31050b; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">New Service Booking #${bookingRef}</h2>
        <p>A new bike service booking has been created on the portal. Details below:</p>
        <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2; width: 180px;">Customer Name</td><td style="padding: 8px; border: 1px solid #e91e63;">${customer_name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Phone Number</td><td style="padding: 8px; border: 1px solid #e91e63;">${customer_phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Email Address</td><td style="padding: 8px; border: 1px solid #e91e63;">${customer_email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Bike Model</td><td style="padding: 8px; border: 1px solid #e91e63;">${bike_model}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Service Type</td><td style="padding: 8px; border: 1px solid #e91e63;">${service_type}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Date &amp; Time</td><td style="padding: 8px; border: 1px solid #e91e63;">${booking_date} at ${booking_time}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Pickup Requested?</td><td style="padding: 8px; border: 1px solid #e91e63;">${needs_pickup ? "Yes" : "No"}</td></tr>
          ${needs_pickup ? `<tr><td style='padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;'>Pickup Address</td><td style='padding: 8px; border: 1px solid #e91e63;'>${pickup_address || "None"}</td></tr>` : ""}
          ${needs_pickup ? `<tr><td style='padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;'>Drop Address</td><td style='padding: 8px; border: 1px solid #e91e63;'>${drop_address || "None"}</td></tr>` : ""}
          <tr><td style="padding: 8px; border: 1px solid #e91e63; font-weight: bold; background: #fff0f2;">Special Instructions</td><td style="padding: 8px; border: 1px solid #e91e63;">${special_instructions || "None"}</td></tr>
        </table>
        <p style="margin-top: 20px; font-size: 0.85rem; color: #4e4548;">Sukhwal Auto Services Admin Notification</p>
      </body>
    </html>
  `;

  // Customer Confirmation Email
  const customerSubject = `Booking Confirmation - Sukhwal Auto Services (#SAS-${bookingRef})`;
  const customerHtml = `
    <html>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                <tr>
                  <td align="center" style="background: linear-gradient(135deg, #e11d48 0%, #be123c 100%); padding: 40px 30px; text-align: center;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; padding: 6px 14px; border-radius: 9999px; margin-bottom: 16px;">
                      Booking Confirmed
                    </span>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-transform: uppercase;">
                      SUKHWAL AUTO SERVICES
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 13px; color: #ffe4e6; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;">
                      Hero MotoCorp &amp; Hero Honda Specialists
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 30px;">
                    <h2 style="margin-top: 0; margin-bottom: 12px; font-size: 20px; font-weight: 700; color: #0f172a;">
                      Hello ${customer_name},
                    </h2>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #fff1f2; border-left: 4px solid #e11d48; border-radius: 8px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; font-size: 16px; line-height: 24px; font-weight: 600; color: #9f1239;">
                            Sukhwal Auto Services confirms your service booking and our team will contact you shortly to coordinate further details.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 24px; color: #475569;">
                      Thank you for choosing us for your bike service. Below are the details of your appointment:
                    </p>

                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 30px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; overflow: hidden;">
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b; width: 160px;">Booking Ref</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">#SAS-${bookingRef}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Bike Model</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${bike_model}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Service Type</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${service_type}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Appointment Date</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${booking_date}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 600; color: #64748b;">Appointment Time</td>
                        <td style="padding: 14px 20px; border-bottom: 1px solid #f1f5f9; font-size: 14px; font-weight: 700; color: #0f172a;">${booking_time}</td>
                      </tr>
                      <tr>
                        <td style="padding: 14px 20px; font-size: 14px; font-weight: 600; color: #64748b;">Service Mode</td>
                        <td style="padding: 14px 20px; font-size: 14px; font-weight: 700; color: #0f172a;">${needs_pickup ? "Doorstep Pickup & Drop" : "Self Drop-off at Workshop"}</td>
                      </tr>
                    </table>

                    <p style="margin: 0; font-size: 15px; line-height: 24px; color: #475569;">
                      Best Regards,<br>
                      <strong>Gopal Sukhwal &amp; Team</strong><br>
                      Sukhwal Auto Services, Bhilwara
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background-color: #f1f5f9; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b; font-weight: 600;">
                      Need immediate help? Call us: <a href="tel:+919413757303" style="color: #e11d48; text-decoration: none; font-weight: 700;">+91 94137 57303</a> / <a href="tel:+919461524500" style="color: #e11d48; text-decoration: none; font-weight: 700;">+91 94615 24500</a>
                    </p>
                    <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                      Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)
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

  const sendAdmin = transporter.sendMail({
    from: `"Sukhwal Auto Services" <${smtpUser}>`,
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
  });

  const sendCustomer = transporter.sendMail({
    from: `"Sukhwal Auto Services" <${smtpUser}>`,
    to: customer_email,
    subject: customerSubject,
    html: customerHtml,
  });

  try {
    await Promise.allSettled([sendAdmin, sendCustomer]);

    // Async forward to Render backend to persist in DB
    const renderApiUrl = process.env.RENDER_API_URL || 'https://sukhwal-auto-backend.onrender.com';
    fetch(`${renderApiUrl}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    }).catch(err => console.warn('Render DB booking sync error:', err.message));

    return res.status(201).json({
      id: bookingRef,
      status: 'Confirmed',
      message: 'Booking confirmed and emails dispatched successfully.'
    });
  } catch (error) {
    console.error('[VERCEL BOOKING ERROR]', error);
    return res.status(500).json({ error: error.message || 'Failed to dispatch booking emails' });
  }
}
