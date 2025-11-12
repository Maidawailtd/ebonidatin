export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY

  if (!apiKey) {
    console.error("SendGrid API key not configured")
    return false
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: options.to }] }],
        from: { email: "noreply@ebonidating.com" },
        subject: options.subject,
        content: [
          {
            type: "text/html",
            value: options.html,
          },
          ...(options.text
            ? [
                {
                  type: "text/plain",
                  value: options.text,
                },
              ]
            : []),
        ],
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Email send failed:", error)
    return false
  }
}

export function getVerificationEmailHTML(verificationLink: string, userName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p>Hi ${userName},</p>
      <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 12px 30px; background-color: #ff69b4; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Verify Email Address
      </a>
      <p style="color: #666; font-size: 12px;">Or copy this link: ${verificationLink}</p>
      <p style="color: #999; font-size: 12px;">This link expires in 24 hours.</p>
    </div>
  `
}

export function getWelcomeEmailHTML(userName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to Eboni Dating!</h2>
      <p>Hi ${userName},</p>
      <p>Your email has been verified! You're all set to start exploring profiles and making connections.</p>
      <p>Complete your profile to increase your visibility and get more matches:</p>
      <ul style="color: #666;">
        <li>Add professional photos</li>
        <li>Write a compelling bio</li>
        <li>List your interests</li>
        <li>Set your preferences</li>
      </ul>
      <p>Happy dating!</p>
      <p style="color: #999; font-size: 12px;">Eboni Dating Team</p>
    </div>
  `
}

export function getPasswordResetEmailHTML(resetLink: string, userName: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Reset Your Password</h2>
      <p>Hi ${userName},</p>
      <p>We received a request to reset your password. Click the button below:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background-color: #ff69b4; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Reset Password
      </a>
      <p style="color: #666; font-size: 12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
    </div>
  `
}
