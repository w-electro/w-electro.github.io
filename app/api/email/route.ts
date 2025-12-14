import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, text } = await req.json();

    if (!to || !subject) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject" },
        { status: 400 }
      );
    }

    // If RESEND_API_KEY is not configured, return a demo response
    if (!process.env.RESEND_API_KEY) {
      console.log("Demo mode: Email would be sent to:", to);
      return NextResponse.json({
        success: true,
        message: "Demo mode - Email not actually sent",
        data: { id: "demo_" + Date.now() },
      });
    }

    // Initialize Resend lazily inside the handler (not at module level)
    // This prevents build-time errors when env vars aren't available
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Najah <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || `<p>${text || subject}</p>`,
      text: text || subject,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
