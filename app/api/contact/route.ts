import { NextResponse } from 'next/server';
import { insertContactSubmission } from '@/lib/cloudflare/d1';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // We save the submission to the database first.
    await insertContactSubmission({ name, email, subject, message });

    try {
      // Notify an admin
      await resend.emails.send({
        from: 'Contact Form <noreply@yourdomain.com>',
        to: 'admin@ebonidating.com',
        subject: `New Inquiry: ${subject}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      });

      // Send a confirmation to the user
      await resend.emails.send({
        from: 'EbonyDating Support <support@yourdomain.com>',
        to: email,
        subject: 'We\'ve received your message',
        html: `<p>Hi ${name},</p><p>Thanks for reaching out! We\'ve received your message and a member of our team will get back to you shortly.</p><p>Best,</p><p>The EbonyDating Team</p>`,
      });
    } catch (emailError) {
      console.error('Error sending contact email:', emailError);
      // We don't want to return an error to the user, since the main action (saving the message) succeeded.
      // You might want to log this to a monitoring service.
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
