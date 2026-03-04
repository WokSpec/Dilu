import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Store in KV if available, otherwise log
    // When WAITLIST_KV is bound via wrangler.toml, entries persist
    const key = `waitlist:${email.toLowerCase().trim()}`;
    const entry = { email, joinedAt: new Date().toISOString() };

    // @ts-ignore — CF bindings available at runtime
    if (typeof WAITLIST_KV !== 'undefined') {
      // @ts-ignore
      await WAITLIST_KV.put(key, JSON.stringify(entry));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
