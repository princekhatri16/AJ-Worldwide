import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Rate limiting map: IP -> array of timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const InquirySchema = z.object({
  fullName: z.string().trim().min(2, "Full Name must be at least 2 characters"),
  companyName: z.string().trim().optional(),
  country: z.string().trim().min(2, "Country is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(4, "Please enter a valid WhatsApp / Phone number"),
  product: z.enum(["Textile", "Fruit & Vegetables", "Coconut", "Jaggery"], {
    message: "Please select a valid product",
  }),
  quantity: z.string().trim().min(1, "Quantity Required is required"),
  destination: z.string().trim().min(2, "Destination Country/Port is required"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Parse & Validate
    const body = await req.json();
    const result = InquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data;

    // 3. Honeypot Check
    if (data.honeypot && data.honeypot.trim() !== "") {
      return NextResponse.json(
        { error: "Spam detected." },
        { status: 400 }
      );
    }

    // 4. Send Email via Nodemailer if SMTP configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.INQUIRY_TO_EMAIL;
    const fromEmail = process.env.INQUIRY_FROM_EMAIL || "noreply@ajworldwide.com";

    if (smtpHost && smtpUser && smtpPass && toEmail) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transporter.sendMail({
          from: `"AJ Worldwide Inquiries" <${fromEmail}>`,
          to: toEmail,
          replyTo: data.email,
          subject: `New Inquiry from ${data.fullName} — ${data.product}`,
          text: `
AJ Worldwide — Trade Inquiry
============================
Full Name: ${data.fullName}
Company Name: ${data.companyName || "N/A"}
Country: ${data.country}
Email Address: ${data.email}
WhatsApp / Phone: ${data.phone}
Product Interested In: ${data.product}
Quantity Required: ${data.quantity}
Destination Country/Port: ${data.destination}

Message / Requirements:
${data.message}

Submitted: ${new Date().toISOString()}
IP: ${ip}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #E3DCCF; background-color: #FAF7F2;">
              <div style="background-color: #1F4A3A; padding: 20px; text-align: center; border-bottom: 3px solid #B4763A;">
                <h1 style="color: #FAF7F2; margin: 0; font-size: 20px; letter-spacing: 2px;">AJ WORLDWIDE</h1>
                <p style="color: #B4763A; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase;">Trade Inquiry Received</p>
              </div>
              <div style="padding: 24px; background-color: #ffffff;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold; width: 40%;">Full Name:</td><td>${data.fullName}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Company Name:</td><td>${data.companyName || "N/A"}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Country:</td><td>${data.country}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">WhatsApp / Phone:</td><td>${data.phone}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Product:</td><td style="color: #B4763A; font-weight: bold;">${data.product}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Quantity:</td><td>${data.quantity}</td></tr>
                  <tr style="border-bottom: 1px solid #E3DCCF;"><td style="padding: 8px 0; font-weight: bold;">Destination:</td><td>${data.destination}</td></tr>
                </table>
                <div style="margin-top: 20px; padding: 14px; background-color: #F1ECE3; border-left: 3px solid #B4763A;">
                  <strong>Message / Requirements:</strong>
                  <p style="margin: 6px 0 0 0; white-space: pre-wrap; color: #2A2622;">${data.message}</p>
                </div>
              </div>
            </div>
          `,
        });
      } catch (mailErr) {
        console.error("Nodemailer dispatch error:", mailErr);
      }
    } else {
      console.log("=== [DEVELOPMENT MODE: INQUIRY SUBMITTED] ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("=============================================");
    }

    return NextResponse.json(
      { success: true, message: "Inquiry sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API /api/inquiry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
