"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;
  const service = formData.get("service") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "Please fill in all required fields." };
  }

  try {
    await resend.emails.send({
      from: "PrintAI Contact <noreply@printai.cloud>",
      to: "sales@printai.cloud",
      subject: `New Inquiry from ${name} – ${service || "General"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #0d2137; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="background: #f8fafc; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Company</td><td style="padding: 8px 0;">${company || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b; font-size: 14px;">Service Interest</td><td style="padding: 8px 0;">${service || "—"}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: white; border-radius: 6px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; color: #64748b; font-size: 14px;">Message</p>
              <p style="margin: 0;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: "Thank you! We'll be in touch within 1 business day.",
    };
  } catch (error) {
    console.error("Email send error:", error);
    return {
      success: false,
      message: "Something went wrong. Please email us directly at sales@printai.cloud.",
    };
  }
}
