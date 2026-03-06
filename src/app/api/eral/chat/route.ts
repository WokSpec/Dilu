import { NextRequest, NextResponse } from 'next/server';

const ERAL_API = process.env.ERAL_API_URL ?? 'https://eral.wokspec.org/api';
const ERAL_API_KEY = process.env.ERAL_API_KEY ?? '';

export const runtime = 'nodejs';

function getIntegration(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }
  return value as Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  if (!ERAL_API_KEY) {
    return NextResponse.json({ error: 'Eral not configured' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const message = String(body.message ?? body.prompt ?? '').trim();
  if (!message) {
    return NextResponse.json({ error: 'message is required' }, { status: 400 });
  }

  const eralRes = await fetch(`${ERAL_API}/v1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ERAL_API_KEY}`,
      'X-Eral-Source': 'dilu',
    },
    body: JSON.stringify({
      message,
      sessionId: body.sessionId ?? 'dilu-public',
      product: 'dilu',
      pageContext: typeof body.pageContext === 'string' ? body.pageContext : undefined,
      integration: getIntegration(body.integration),
    }),
  });

  const data = await eralRes.json() as {
    data?: { response?: string; sessionId?: string; model?: string };
    error?: unknown;
  };

  if (!eralRes.ok) {
    return NextResponse.json(data.error ?? data, { status: eralRes.status });
  }

  return NextResponse.json({
    reply: data.data?.response ?? '',
    sessionId: data.data?.sessionId ?? body.sessionId,
    model: data.data?.model ?? 'eral',
  });
}
