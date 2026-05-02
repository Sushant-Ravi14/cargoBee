/**
 * OTP Utility — Email-based
 *
 * In development (no SMTP config): logs OTP to console.
 * In production: sends OTP email via Nodemailer (SMTP).
 */

const nodemailer = require('nodemailer');

/**
 * Generate a random 6-digit numeric OTP
 */
const generateOTP = () => String(Math.floor(100000 + Math.random() * 900000));

/**
 * Create a Nodemailer transporter from env config
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send OTP email to the specified address.
 * In dev mode (no EMAIL_USER), just logs to console.
 */
const sendOTP = async (email, otp) => {
  const expiryMinutes = process.env.OTP_EXPIRY_MINUTES || 10;

  // Dev mode — no SMTP configured, just log
  if (!process.env.EMAIL_USER || process.env.NODE_ENV !== 'production') {
    console.log(`\n📧 [DEV OTP] Email: ${email} | OTP: ${otp}\n`);
    return true;
  }

  const transporter = createTransporter();

  const mailOptions = {
    from: `"${process.env.EMAIL_FROM_NAME || 'CargoBee'}" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your CargoBee Login OTP',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; background: #f5f5f5; padding: 32px;">
          <div style="max-width: 480px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
            <div style="text-align: center; margin-bottom: 32px;">
              <h1 style="color: #1A1A2E; font-size: 28px; margin: 0;">🐝 CargoBee</h1>
              <p style="color: #666; margin-top: 8px;">Secured Logistics Platform</p>
            </div>

            <h2 style="color: #1A1A2E; font-size: 20px; margin-bottom: 8px;">Your Login OTP</h2>
            <p style="color: #555; line-height: 1.6;">
              Use the following One-Time Password to sign in to your CargoBee account.
              This OTP is valid for <strong>${expiryMinutes} minutes</strong>.
            </p>

            <div style="background: #f0f4ff; border: 2px dashed #4F6BFF; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #1A1A2E;">${otp}</span>
            </div>

            <p style="color: #888; font-size: 13px; line-height: 1.5;">
              If you did not request this OTP, please ignore this email.
              Do not share this code with anyone.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <p style="color: #bbb; font-size: 12px; text-align: center;">
              © ${new Date().getFullYear()} CargoBee. All rights reserved.
            </p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 OTP email sent to: ${email}`);
    return true;
  } catch (err) {
    console.error('Nodemailer Error:', err.message);
    throw new Error('Failed to send OTP email. Check your SMTP configuration in .env');
  }
};

module.exports = { generateOTP, sendOTP };
