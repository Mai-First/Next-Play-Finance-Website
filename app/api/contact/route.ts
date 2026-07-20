import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  role?: string;
  message?: string;
  company?: string; // honeypot — real users never fill this
};

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions without doing anything.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  const role = body.role?.trim() || "Not specified";

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const payload = { name, email, role, message, receivedAt: new Date().toISOString() };
  const tasks: Promise<Response>[] = [];

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL ?? "NPF Website <onboarding@resend.dev>",
          to: [process.env.CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `NPF website contact — ${name} (${role})`,
          text: `Name: ${name}\nEmail: ${email}\nRole: ${role}\n\n${message}`,
        }),
      }),
    );
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }),
    );
  }

  if (tasks.length === 0) {
    // No delivery configured — log so submissions aren't lost in development.
    console.log("[contact] submission (no delivery configured):", payload);
    return NextResponse.json({ ok: true });
  }

  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  if (!delivered) {
    console.error("[contact] all deliveries failed:", results);
    return NextResponse.json(
      { ok: false, error: "Something went wrong sending your message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
