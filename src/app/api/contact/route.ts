import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

// --- Rate Limiting Setup ---
// Simple in-memory store for rate limiting (Note: resets on server restart or serverless cold starts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3;

function getRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true; // Allowed
  }

  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + RATE_LIMIT_WINDOW_MS;
    return true; // Allowed (window reset)
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limited
  }

  record.count++;
  return true; // Allowed
}

export async function POST(req: Request) {
  try {
    // 0. Rate Limiting Check
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown-ip';
    if (!getRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again after 15 minutes.' },
        { status: 429 } // 429 Too Many Requests
      );
    }
    const body = await req.json();
    const { name, email, company, service, budget, message } = body;

    // 1. Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Missing required fields (name, email, message).' },
        { status: 400 }
      );
    }

    // 2. Connect to DB and Save Document
    try {
      await dbConnect();
      await Contact.create({
        name,
        email,
        company: company || 'Not provided',
        service: service || 'Not provided',
        budget: budget || 'Not provided',
        message,
      });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      return NextResponse.json(
        { message: 'Failed to save to database. Please try again later.' },
        { status: 500 }
      );
    }

    // 3. Send Email Notification
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;
    const EMAIL_TO = process.env.EMAIL_TO || EMAIL_USER;

    if (!EMAIL_USER || !EMAIL_PASS) {
      console.warn('EMAIL_USER or EMAIL_PASS not configured. Skipping email notification.');
      // We still return 200 because DB save was successful, but we log a warning on server.
      return NextResponse.json(
        { message: 'Contact saved, but email notification skipped due to server config.' },
        { status: 200 }
      );
    }

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Usually Gmail; adjust if using another service
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${name}" <${email}>`, // From user (via server)
        replyTo: email,
        to: EMAIL_TO, // To site owner
        subject: `New Project Enquiry from ${name}`,
        html: `
          <div style="font-family: sans-serif; color: #111; line-height: 1.6;">
            <h2 style="color: #6cf716;">New Enquiry — Dimensity Labs</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${company || 'N/A'}</p>
            <p><strong>Service:</strong> ${service || 'N/A'}</p>
            <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
            <br />
            <h3>Project Details:</h3>
            <p style="background: #f4f4f5; padding: 15px; border-radius: 8px;">
              ${message.replace(/\n/g, '<br />')}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error('Email Notification Error:', emailError);
      // We still return success to the user because we securely captured the lead in the DB
    }

    // 4. Return Success
    return NextResponse.json(
      { message: 'Enquiry submitted successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API Error /contact:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
