'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dilu-bg/90 backdrop-blur-md border-b border-dilu-border' : ''
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-gradient">Dilu</span>
          <span className="text-xs text-dilu-muted font-medium px-2 py-0.5 rounded-full border border-dilu-border">
            by WokSpec
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <a href="#templates" className="text-sm text-dilu-muted hover:text-white transition-colors">
            Templates
          </a>
          <a href="#how" className="text-sm text-dilu-muted hover:text-white transition-colors">
            How it works
          </a>
          <a
            href="https://wokspec.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dilu-muted hover:text-white transition-colors"
          >
            WokSpec
          </a>
          <a
            href="#waitlist"
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-dilu-gradient hover:opacity-90 transition-opacity"
          >
            Get early access
          </a>
        </div>
      </div>
    </nav>
  );
}
