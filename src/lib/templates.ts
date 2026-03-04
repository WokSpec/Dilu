export type Template = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  color: string;
  icon: string;
  status: 'available' | 'coming-soon';
  features: string[];
  stack: { label: string; value: string }[];
  configFields: {
    id: string;
    label: string;
    placeholder: string;
    type: 'text' | 'color' | 'select';
    options?: string[];
  }[];
};

export const templates: Template[] = [
  {
    id: 'ai-news',
    name: 'AI News Platform',
    tagline: 'Your own AI-curated news site',
    description:
      'An AI-powered news platform across any topic or category. Auto-fetches, summarizes, and publishes content daily. Built on WokPost.',
    longDescription:
      'Launch your own AI-powered news publication in minutes. WokPost-based — it pulls from real sources, summarizes with AI, organizes by category, and publishes on a clean reading experience. Pick any vertical: tech, sports, finance, entertainment, local news. Your brand, your domain, fully automated.',
    tags: ['AI', 'Content', 'News'],
    liveUrl: 'https://wokpost.wokspec.org',
    color: '#7c3aed',
    icon: '📰',
    status: 'available',
    features: [
      'Auto-pulls from 50+ RSS sources daily',
      'AI summarization + rewrite per article',
      'Up to 20 content categories',
      'Full-text search with Cloudflare D1',
      'Eral AI assistant on every page',
      'RSS feed for your readers',
      'Dark/light mode reader experience',
      'Social share + OG images auto-generated',
    ],
    stack: [
      { label: 'Framework', value: 'Next.js 15 (App Router)' },
      { label: 'Hosting', value: 'Cloudflare Pages' },
      { label: 'Database', value: 'Cloudflare D1 (SQLite)' },
      { label: 'AI', value: 'Eral + Workers AI' },
      { label: 'Cron', value: 'Cloudflare Cron Triggers' },
    ],
    configFields: [
      { id: 'siteName', label: 'Site name', placeholder: 'TechPulse Daily', type: 'text' },
      { id: 'category', label: 'Primary category', placeholder: 'Technology', type: 'select',
        options: ['Technology', 'Finance', 'Sports', 'Entertainment', 'Health', 'Science', 'Business', 'Gaming', 'Other'] },
      { id: 'tagline', label: 'Tagline', placeholder: 'Stay ahead of the curve', type: 'text' },
      { id: 'accentColor', label: 'Accent color', placeholder: '#7c3aed', type: 'color' },
    ],
  },
  {
    id: 'tool-suite',
    name: 'Tool Suite',
    tagline: '80+ browser-based utilities, your brand',
    description:
      'A fully client-side tool platform. No backend required. Background remover, PDF tools, color palettes, image editors, and more. Built on WokTool.',
    longDescription:
      "The internet's most-used tools — background remover, PDF compressor, image converter, color palette generator, QR code maker, and 75 more — all running in the browser, no upload to any server, completely private. White-label it with your brand and monetize with ads or subscriptions. No backend. No server costs.",
    tags: ['Tools', 'Developer', 'Design'],
    liveUrl: 'https://tools.wokspec.org',
    color: '#3b82f6',
    icon: '🔧',
    status: 'available',
    features: [
      '80+ browser-based tools (no upload needed)',
      'AI-powered background removal (ONNX/WebAssembly)',
      'PDF compress, merge, split, convert',
      'Image tools: resize, convert, crop, filters',
      'Developer tools: JSON, regex, color picker',
      'Typography + font pairing tools',
      'Fully client-side — user data never leaves the browser',
      'Fast global CDN via Cloudflare Pages',
    ],
    stack: [
      { label: 'Framework', value: 'Next.js 14 (App Router)' },
      { label: 'Hosting', value: 'Cloudflare Pages' },
      { label: 'AI/ML', value: 'ONNX Runtime Web + WebAssembly' },
      { label: 'PDF', value: 'PDF.js + pdf-lib (client-side)' },
      { label: 'Backend', value: 'None — 100% client-side' },
    ],
    configFields: [
      { id: 'siteName', label: 'Site name', placeholder: 'DevToolkit', type: 'text' },
      { id: 'tagline', label: 'Tagline', placeholder: 'Every tool you need, free.', type: 'text' },
      { id: 'accentColor', label: 'Accent color', placeholder: '#3b82f6', type: 'color' },
      { id: 'audience', label: 'Target audience', placeholder: 'Developers', type: 'select',
        options: ['Developers', 'Designers', 'Marketers', 'General', 'Students'] },
    ],
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    tagline: 'Your own AI with memory and personality',
    description:
      'A personalized AI chat assistant. Remembers conversations, works across your site as a widget, and integrates with anything you build. Built on Eral.',
    longDescription:
      "Your own branded AI assistant — with memory. Eral remembers past conversations, understands your product context, and helps your users accomplish real things. Embed it as a widget on any site, use it as a standalone chat app, or integrate it into your own product. You control the personality, the knowledge, the access.",
    tags: ['AI', 'Chat', 'Productivity'],
    liveUrl: 'https://eral.wokspec.org',
    color: '#10b981',
    icon: '🤖',
    status: 'available',
    features: [
      'Persistent memory across sessions (Cloudflare KV)',
      'Embeddable widget for any website',
      'Standalone chat app with auth',
      'Custom system prompt / personality',
      'Page context awareness (reads the current page)',
      'Summarize, draft, explain — any page on the web',
      'Browser extension version available',
      'Powered by Workers AI (Llama 3.3 70B)',
    ],
    stack: [
      { label: 'Framework', value: 'Next.js 15 + Plasmo (extension)' },
      { label: 'Hosting', value: 'Cloudflare Pages + Workers' },
      { label: 'AI', value: 'Cloudflare Workers AI (Llama 3.3)' },
      { label: 'Memory', value: 'Cloudflare KV' },
      { label: 'Auth', value: 'WokAPI JWT' },
    ],
    configFields: [
      { id: 'assistantName', label: 'Assistant name', placeholder: 'Nova', type: 'text' },
      { id: 'personality', label: 'Personality style', placeholder: 'Helpful', type: 'select',
        options: ['Helpful & Professional', 'Casual & Friendly', 'Technical Expert', 'Creative & Playful', 'Concise & Direct'] },
      { id: 'systemContext', label: 'Context / specialty', placeholder: 'A SaaS for project management', type: 'text' },
      { id: 'accentColor', label: 'Accent color', placeholder: '#10b981', type: 'color' },
    ],
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    tagline: 'Production-ready bot for your community',
    description:
      'Music, moderation, economy, AI commands, and a full agent pool. Deploy your own Discord bot with a web dashboard. Built on Chopsticks.',
    longDescription:
      "A full-featured Discord bot with everything your community needs. Music playback (Lavalink), server moderation, economy system, leveling, custom commands, AI chat via Eral, and an agent pool for automated tasks. Plus a web dashboard where admins manage settings and view stats. Open source, self-hostable, or we deploy it for you.",
    tags: ['Discord', 'Bot', 'Community'],
    liveUrl: 'https://chopsticks.wokspec.org',
    color: '#f59e0b',
    icon: '🎵',
    status: 'available',
    features: [
      'Music: YouTube, Spotify, SoundCloud via Lavalink',
      'Moderation: auto-mod, warnings, mutes, bans',
      'Economy: coins, shop, leaderboard',
      'Leveling system with custom rewards',
      'AI commands powered by Eral',
      'Agent pool for scheduled tasks',
      'Web dashboard (Next.js) for server admins',
      'Slash commands + legacy prefix support',
    ],
    stack: [
      { label: 'Bot', value: 'discord.js v14 + TypeScript' },
      { label: 'Music', value: 'Lavalink + shoukaku' },
      { label: 'Database', value: 'PostgreSQL + Prisma' },
      { label: 'Dashboard', value: 'Next.js on Cloudflare Pages' },
      { label: 'AI', value: 'Eral (WokSpec)' },
    ],
    configFields: [
      { id: 'botName', label: 'Bot name', placeholder: 'MyBot', type: 'text' },
      { id: 'prefix', label: 'Command prefix', placeholder: '!', type: 'text' },
      { id: 'features', label: 'Primary feature', placeholder: 'Music', type: 'select',
        options: ['Music', 'Moderation', 'Economy', 'General Purpose', 'AI-focused', 'Gaming'] },
      { id: 'accentColor', label: 'Dashboard accent', placeholder: '#f59e0b', type: 'color' },
    ],
  },
  {
    id: 'content-gen',
    name: 'Content Generator',
    tagline: 'AI text, image, and video generation',
    description:
      'A full AI content studio. Generate blog posts, social content, visuals, and videos from prompts. Built on WokGen.',
    longDescription:
      'Your own AI content studio. Generate long-form blog posts, social media threads, email sequences, product descriptions, image prompts, and more — all from a single dashboard. Powered by WokGen, fine-tuned for output that actually sounds human.',
    tags: ['AI', 'Content', 'Generation'],
    color: '#ec4899',
    icon: '✍️',
    status: 'coming-soon',
    features: [
      'Long-form blog post generation',
      'Social media thread & caption writer',
      'Email sequence generator',
      'Image prompt engineering',
      'Brand voice customization',
      'Content calendar planning with AI',
      'Export to Notion, Markdown, HTML',
      'Batch generation for bulk content',
    ],
    stack: [
      { label: 'Framework', value: 'Next.js 15 (App Router)' },
      { label: 'Hosting', value: 'Cloudflare Pages' },
      { label: 'AI', value: 'Workers AI + Eral' },
      { label: 'Database', value: 'PostgreSQL (Neon)' },
      { label: 'Auth', value: 'WokAPI JWT' },
    ],
    configFields: [
      { id: 'brandName', label: 'Brand name', placeholder: 'ContentHQ', type: 'text' },
      { id: 'industry', label: 'Industry', placeholder: 'SaaS', type: 'select',
        options: ['SaaS', 'E-commerce', 'Agency', 'Creator', 'Healthcare', 'Real Estate', 'Finance', 'Other'] },
      { id: 'tone', label: 'Default tone', placeholder: 'Professional', type: 'select',
        options: ['Professional', 'Casual', 'Witty', 'Authoritative', 'Conversational'] },
      { id: 'accentColor', label: 'Accent color', placeholder: '#ec4899', type: 'color' },
    ],
  },
  {
    id: 'agency-console',
    name: 'Agency Console',
    tagline: 'Manage clients with AI-powered CRM',
    description:
      'A white-label client management platform. Contacts, pipelines, automations, and Eral AI on every page. Built on WokSpec Console.',
    longDescription:
      'Run your agency with a platform built for how agencies actually work. Client dashboards, CRM with pipeline kanban, automation management, and Eral AI to help draft proposals, respond to clients, and surface insights. White-label it completely — your brand, your domain, your clients see your product.',
    tags: ['Agency', 'CRM', 'Business'],
    liveUrl: 'https://console.wokspec.org',
    color: '#6366f1',
    icon: '🏢',
    status: 'coming-soon',
    features: [
      'CRM: contacts, companies, deals',
      'Pipeline kanban (drag & drop)',
      'Client portal — clients log in and see their project',
      'Automation builder (GoHighLevel-powered)',
      'Eral AI on every page — draft, respond, summarize',
      'White-label: your logo, your domain, your brand',
      'Multi-user with role-based access',
      'Invoice + proposal generation with AI',
    ],
    stack: [
      { label: 'Framework', value: 'Next.js 14 (App Router)' },
      { label: 'Hosting', value: 'Cloudflare Pages' },
      { label: 'CRM', value: 'GoHighLevel API' },
      { label: 'AI', value: 'Eral (WokSpec)' },
      { label: 'Auth', value: 'WokAPI JWT' },
    ],
    configFields: [
      { id: 'agencyName', label: 'Agency name', placeholder: 'Apex Digital', type: 'text' },
      { id: 'tagline', label: 'Tagline', placeholder: 'We build what matters.', type: 'text' },
      { id: 'accentColor', label: 'Brand color', placeholder: '#6366f1', type: 'color' },
      { id: 'services', label: 'Primary service', placeholder: 'Web Design', type: 'select',
        options: ['Web Design', 'Marketing', 'SEO', 'Development', 'Branding', 'Social Media', 'Full Service'] },
    ],
  },
];

export function getTemplate(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}
