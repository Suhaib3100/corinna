// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { emailTemplate } from '../../lib/emailTemplate';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL, // Use the environment variable
    pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD, // Use the environment variable
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, content } = req.body;
  const htmlContent = emailTemplate.replace('{{content}}', content);

  try {
    await transporter.sendMail({
      from: process.env.NODE_MAILER_EMAIL,
      to,
      subject,
      html: htmlContent,
    });
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
}
