import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, templateId, config } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const key = `waitlist:${email.toLowerCase().trim()}`;
    const entry = {
      email: email.toLowerCase().trim(),
      templateId: templateId ?? null,
      config: config ?? null,
      joinedAt: new Date().toISOString(),
    };

    // CF Pages KV binding via globalThis (opennextjs/cloudflare pattern)
    // @ts-ignore
    const kv = globalThis.WAITLIST_KV;
    if (kv) {
      await kv.put(key, JSON.stringify(entry));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
