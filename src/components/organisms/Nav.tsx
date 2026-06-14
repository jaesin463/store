import { ChevronRight, Github, Menu, Moon, Sun, X } from "lucide-react";
import type { Page } from "../../features/showcase/types";

const NAV_LINKS: { id: Page; label: string }[] = [
  { id: "home", label: "홈" },
  { id: "apps", label: "앱 목록" },
  { id: "patchnotes", label: "패치노트" },
  { id: "blog", label: "블로그" },
  { id: "request", label: "개발 요청" },
  { id: "about", label: "소개" },
];

export function Nav({ page, setPage, mobileOpen, setMobileOpen, isDark, setIsDark }: {
  page: Page;
  setPage: (p: Page) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}) {
  const activePage = ["app-detail"].includes(page) ? "apps" : page === "blog-post" ? "blog" : page;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <button
          onClick={() => setPage("home")}
          className="flex items-baseline gap-1.5 hover:opacity-80 transition-opacity"
        >
          <span className="text-primary font-bold text-lg tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            앱화점
          </span>
          <span className="text-muted-foreground text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            v1.0
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`px-3 py-1.5 text-sm rounded transition-colors ${
                activePage === link.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-2 p-2 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary"
            title={isDark ? "라이트 모드" : "다크 모드"}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded"
          >
            <Github size={16} />
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/98">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => { setPage(link.id); setMobileOpen(false); }}
              className={`w-full text-left px-6 py-3.5 text-sm border-b border-border/50 flex items-center justify-between transition-colors ${
                activePage === link.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <ChevronRight size={14} className="opacity-40" />
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
