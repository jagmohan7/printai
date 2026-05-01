import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    console.log("[CONTACT] 1. Request received");
    
    // Debug: Check env variables
    console.log("[CONTACT] 2. Environment variables loaded:");
    console.log("   - SMTP_HOST:", process.env.SMTP_HOST ? "✓ Set" : "✗ Missing");
    console.log("   - SMTP_PORT:", process.env.SMTP_PORT ? "✓ Set" : "✗ Missing");
    console.log("   - SMTP_USER:", process.env.SMTP_USER ? "✓ Set" : "✗ Missing");
    console.log("   - SMTP_PASS:", process.env.SMTP_PASS ? "✓ Set" : "✗ Missing");

    const body = await req.json();
    console.log("[CONTACT] 3. Request body parsed:", { name: body.name, email: body.email });

    const { name, email, company, service, message } = body;

    // Validation
    if (!name || !email || !message) {
      console.log("[CONTACT] 4. Validation failed - missing required fields");
      return Response.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("[CONTACT] 5. Email format validation failed");
      return Response.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    console.log("[CONTACT] 6. Creating transporter with config:", {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465" ? true : false,
    });

    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for other ports
      requireTLS: smtpPort !== 465, // Force TLS for port 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      logger: true, // Enable nodemailer logging
      debug: true,  // Enable debug mode
    });

    // Test connection
    console.log("[CONTACT] 7. Verifying SMTP connection...");
    await transporter.verify();
    console.log("[CONTACT] 8. SMTP connection verified ✓");

    // Send email
    console.log("[CONTACT] 9. Sending email...");
    await transporter.sendMail({
      from: `"PrintAI Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
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
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </div>
      `,
    });

    console.log("[CONTACT] 10. Email sent successfully ✓");
    return Response.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("[CONTACT] ✗ Error occurred:");
    console.error("   Error type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("   Error message:", error instanceof Error ? error.message : String(error));
    console.error("   Full error:", error);
    
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      { 
        success: false, 
        message: "Error sending message. Please try again.",
        debug: {
          error: errorMessage,
          type: error instanceof Error ? error.constructor.name : typeof error,
        }
      },
      { status: 500 }
    );
  }
}
