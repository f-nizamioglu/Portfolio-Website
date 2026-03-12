import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Basic in-memory rate limiting (max 3 reqs / 1 min / IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // 1. Basic Rate Limiting Check
    // Vercel Edge proxies provide x-real-ip reliably. x-forwarded-for can be spoofed by attackers to bypass rate limits.
    const ip = req.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();

    // Occasional cleanup of old IP mappings to prevent memory leaks
    if (rateLimitMap.size > 500) {
      rateLimitMap.forEach((value, key) => {
        if (value.resetTime < now) rateLimitMap.delete(key);
      });
    }

    const rateData = rateLimitMap.get(ip);
    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= RATE_LIMIT_MAX) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    // 2. Parse payload
    const body = await req.json();
    const { name, email, message } = body;

    // 3. Strict Validation & Length Limitations
    if (!name || typeof name !== 'string' || !name.trim() || name.length > 100) {
      return NextResponse.json({ error: 'Valid name is required (max 100 chars)' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || email.length > 150) {
      return NextResponse.json({ error: 'Valid email is required (max 150 chars)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0 || message.length > 5000) {
      return NextResponse.json({ error: 'Message cannot be empty or exceed 5000 characters' }, { status: 400 });
    }

    // 4. Basic XSS / Injection Mitigation
    const sanitize = (str: string) => str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const safeName = sanitize(name.trim());
    const safeMessage = sanitize(message.trim());
    const safeEmail = email.trim();

    // The Resend 'testing' account ONLY permits sending to the verified email identity (fnizamioglu@gmail.com).
    // Attempting to send to fikrat.mammadov@std.yildiz.edu.tr restricts the payload entirely. 
    // We are routing to fnizamioglu@gmail.com so the emails are successfully received.
    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['fnizamioglu@gmail.com'], 
      subject: `New Contact Request from ${safeName}`,
      text: `Hello,\n\nYou have received a new message from your portfolio website.\n\nName: ${safeName}\nEmail: ${safeEmail}\n\nMessage:\n${safeMessage}\n`,
      replyTo: safeEmail, 
    });

    if (data.error) {
      console.error('Resend Delivery Error:', data.error.message);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id }, { status: 200 });
  } catch (error) {
    console.error('API Route Exception:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
