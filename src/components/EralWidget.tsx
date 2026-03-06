'use client';

import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; text: string };

const CONTEXT = `You are Dilu, the WokSpec launchpad assistant. Help users figure out which template is right for them and answer questions about building with the WokSpec stack. 

Templates available:
- AI News Platform: AI-curated news site, any category
- Tool Suite: 80+ browser utilities, no backend
- AI Assistant: Your own AI with memory
- Discord Bot: Production bot with music, moderation, economy
- Content Generator: AI writing studio (coming soon)
- Agency Console: CRM + client management (coming soon)

All products deploy to Cloudflare for free. Users own all their code. Eral AI is built into every template. Keep responses concise and helpful.`;

export default function EralWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hey! I'm Dilu — here to help you figure out what to build. What are you working on?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => `dilu-${Math.random().toString(36).slice(2)}`);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/eral/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId,
          product: 'dilu',
          pageContext: CONTEXT,
          integration: {
            name: 'Dilu',
            kind: 'launchpad',
            url: window.location.href,
            origin: window.location.origin,
            pageTitle: document.title,
            capabilities: ['template-guidance', 'launch-planning'],
            instructions: 'Help users pick the right template and explain what they can launch with WokSpec.',
            metadata: {
              pathname: window.location.pathname,
              widget: 'floating',
              surface: 'launchpad',
            },
          },
        }),
      });
      if (!res.ok) {
        throw new Error('Eral proxy request failed');
      }
      const data = await res.json() as { reply?: string };
      const reply = data.reply ?? "I'm not sure about that — but try browsing the templates above!";
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', text: "I'm having trouble connecting right now. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-dilu-gradient flex items-center justify-center text-xl shadow-lg hover:scale-105 transition-transform glow-purple"
        aria-label="Chat with Dilu AI"
      >
        {open ? '✕' : '✦'}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl bg-dilu-surface border border-dilu-border shadow-2xl flex flex-col overflow-hidden"
          style={{ maxHeight: '480px' }}>
          {/* Header */}
          <div className="px-4 py-3 border-b border-dilu-border flex items-center gap-3 bg-dilu-bg">
            <div className="w-8 h-8 rounded-full bg-dilu-gradient flex items-center justify-center text-sm">✦</div>
            <div>
              <div className="text-sm font-semibold">Dilu AI</div>
              <div className="text-xs text-dilu-muted">Powered by Eral</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] text-sm rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-dilu-purple/20 text-white rounded-br-sm'
                      : 'bg-dilu-bg border border-dilu-border text-dilu-muted rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-dilu-bg border border-dilu-border rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm text-dilu-muted">
                  <span className="animate-pulse">···</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-dilu-border bg-dilu-bg">
            <form
              onSubmit={(e) => { e.preventDefault(); send(); }}
              className="flex gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything…"
                className="flex-1 px-3 py-2 rounded-xl bg-dilu-surface border border-dilu-border focus:border-dilu-purple focus:outline-none text-white placeholder:text-dilu-muted text-xs"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl bg-dilu-gradient flex items-center justify-center text-sm hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
