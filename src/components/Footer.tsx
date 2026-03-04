export default function Footer() {
  return (
    <footer className="border-t border-dilu-border py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-bold text-lg text-gradient">Dilu</div>
          <p className="text-xs text-dilu-muted mt-1">by WokSpec — build like us</p>
        </div>

        <div className="flex items-center gap-8 text-sm text-dilu-muted">
          <a href="#templates" className="hover:text-white transition-colors">Templates</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="https://wokspec.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WokSpec</a>
          <a href="https://eral.wokspec.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Eral</a>
        </div>

        <p className="text-xs text-dilu-muted">
          © {new Date().getFullYear()} WokSpec. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
