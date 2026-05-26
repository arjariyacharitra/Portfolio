const nodemailer = require('nodemailer')

/**
 * createTransporter
 * Builds a Nodemailer transporter using SMTP credentials from .env.
 * Uses Gmail SMTP by default; swap SMTP_HOST/PORT for SendGrid or others.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

/**
 * buildEmailHtml
 * Returns a clean HTML email body for the portfolio owner.
 */
function buildEmailHtml({ name, email, phone, message, timestamp }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <style>
    body { font-family: 'DM Sans', Arial, sans-serif; background: #0A0A0A; color: #F0F0F0; margin: 0; padding: 0; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #111111; border: 1px solid #1E1E1E; border-radius: 12px; overflow: hidden; }
    .header { background: #0A0A0A; border-bottom: 1px solid #1E1E1E; padding: 28px 32px; }
    .header h1 { font-size: 18px; font-weight: 700; color: #00FFD1; margin: 0; letter-spacing: 0.05em; }
    .body { padding: 32px; }
    .row { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #888888; margin-bottom: 4px; }
    .value { font-size: 15px; color: #F0F0F0; word-break: break-word; }
    .message-box { background: #0A0A0A; border: 1px solid #1E1E1E; border-radius: 8px; padding: 16px; font-size: 14px; color: #888888; line-height: 1.6; white-space: pre-wrap; }
    .divider { height: 1px; background: #1E1E1E; margin: 24px 0; }
    .footer { background: #0A0A0A; border-top: 1px solid #1E1E1E; padding: 16px 32px; font-size: 11px; color: #444; text-align: center; }
    .accent { color: #00FFD1; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>NEW CONTACT FORM SUBMISSION</h1>
    </div>
    <div class="body">
      <div class="row">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="row">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color:#00FFD1;">${email}</a></div>
      </div>
      <div class="row">
        <div class="label">Phone</div>
        <div class="value">${phone}</div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="label">Message</div>
        <div class="message-box">${message || '(No message provided)'}</div>
      </div>
      <div class="divider"></div>
      <div class="row">
        <div class="label">Submitted at</div>
        <div class="value" style="font-size:13px;color:#888;">${timestamp}</div>
      </div>
    </div>
    <div class="footer">Sent via <span class="accent">Portfolio Contact Form</span></div>
  </div>
</body>
</html>
`.trim()
}

/**
 * sendContactEmail
 * Sends an email to the portfolio owner with the submission details.
 * @param {object} data  - { name, email, phone, message }
 * @returns {Promise<void>}
 */
async function sendContactEmail({ name, email, phone, message }) {
  const timestamp = new Date().toISOString()
  const transporter = createTransporter()

  const mailOptions = {
    from: `"${process.env.FROM_NAME || 'Portfolio Contact Form'}" <${process.env.SMTP_USER}>`,
    to: process.env.OWNER_EMAIL,
    replyTo: email,
    subject: `New Portfolio Inquiry from ${name}`,
    text: [
      'NEW CONTACT FORM SUBMISSION',
      '──────────────────────────────────────',
      `Name      : ${name}`,
      `Email     : ${email}`,
      `Phone     : ${phone}`,
      `Message   : ${message || '(No message provided)'}`,
      `Timestamp : ${timestamp}`,
      '──────────────────────────────────────',
      'Sent via Portfolio Contact Form',
    ].join('\n'),
    html: buildEmailHtml({ name, email, phone, message, timestamp }),
  }

  await transporter.sendMail(mailOptions)
  return timestamp
}

module.exports = { sendContactEmail }
