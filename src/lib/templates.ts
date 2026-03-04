export type Template = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  color: string;
  icon: string;
  status: 'available' | 'coming-soon';
};

export const templates: Template[] = [
  {
    id: 'ai-news',
    name: 'AI News Platform',
    tagline: 'Your own AI-curated news site',
    description:
      'An AI-powered news platform across any topic or category. Auto-fetches, summarizes, and publishes content daily. Built on WokPost.',
    tags: ['AI', 'Content', 'News'],
    liveUrl: 'https://wokpost.wokspec.org',
    color: '#7c3aed',
    icon: '📰',
    status: 'available',
  },
  {
    id: 'tool-suite',
    name: 'Tool Suite',
    tagline: '80+ browser-based utilities, your brand',
    description:
      'A fully client-side tool platform. No backend required. Background remover, PDF tools, color palettes, image editors, and more. Built on WokTool.',
    tags: ['Tools', 'Developer', 'Design'],
    liveUrl: 'https://tools.wokspec.org',
    color: '#3b82f6',
    icon: '🔧',
    status: 'available',
  },
  {
    id: 'ai-assistant',
    name: 'AI Assistant',
    tagline: 'Your own AI with memory and personality',
    description:
      'A personalized AI chat assistant. Remembers conversations, works across your site as a widget, and integrates with anything you build. Built on Eral.',
    tags: ['AI', 'Chat', 'Productivity'],
    liveUrl: 'https://eral.wokspec.org',
    color: '#10b981',
    icon: '🤖',
    status: 'available',
  },
  {
    id: 'discord-bot',
    name: 'Discord Bot',
    tagline: 'Production-ready bot for your community',
    description:
      'Music, moderation, economy, AI commands, and a full agent pool. Deploy your own Discord bot with a web dashboard. Built on Chopsticks.',
    tags: ['Discord', 'Bot', 'Community'],
    liveUrl: 'https://chopsticks.wokspec.org',
    color: '#f59e0b',
    icon: '🎵',
    status: 'available',
  },
  {
    id: 'content-gen',
    name: 'Content Generator',
    tagline: 'AI text, image, and video generation',
    description:
      'A full AI content studio. Generate blog posts, social content, visuals, and videos from prompts. Built on WokGen.',
    tags: ['AI', 'Content', 'Generation'],
    color: '#ec4899',
    icon: '✍️',
    status: 'coming-soon',
  },
  {
    id: 'agency-console',
    name: 'Agency Console',
    tagline: 'Manage clients with AI-powered CRM',
    description:
      'A white-label client management platform. Contacts, pipelines, automations, and Eral AI on every page. Built on WokSpec Console.',
    tags: ['Agency', 'CRM', 'Business'],
    liveUrl: 'https://console.wokspec.org',
    color: '#6366f1',
    icon: '🏢',
    status: 'coming-soon',
  },
];
