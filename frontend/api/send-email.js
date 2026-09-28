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

  const { to, subject, html, replyTo, secretKey } = req.body || {};

  // Simple shared key to prevent open spam relay
  const EXPECTED_SECRET = process.env.INTERNAL_RELAY_KEY || 'sukhwal-secret-smtp-relay-2026';
  if (secretKey && secretKey !== EXPECTED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized relay access' });
  }

  if (!to || !subject || !html) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, html' });
  }

  const user = process.env.SMTP_USER || 'ronaksukhwal5@gmail.com';
  const pass = (process.env.SMTP_PASSWORD || 'hxmzsbljminnxprb').replace(/\s+/g, '');

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Sukhwal Auto Services" <${user}>`,
      to,
      subject,
      html,
      replyTo: replyTo || user,
    });

    console.log(`[VERCEL SMTP SUCCESS] Sent email to ${to}: ${info.messageId}`);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('[VERCEL SMTP ERROR]', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}
