import { Github } from "lucide-react";
import type { Page } from "../../features/showcase/types";

export function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="text-primary font-bold text-base mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>앱화점</div>
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              직접 만든 앱들을 무료로 공유합니다.
              <br className="hidden sm:block"/>
              개선 아이디어나 새 앱 요청을 환영합니다.
            </p>
          </div>
          {[
            {title: "탐색", links: [{ label: "홈", page: "home" as Page }, { label: "앱 목록", page: "apps" as Page }, { label: "패치노트", page: "patchnotes" as Page }, { label: "블로그", page: "blog" as Page }] },
            { title: "참여", links: [{ label: "개발 요청", page: "request" as Page }, { label: "소개", page: "about" as Page }] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{col.title}</div>
              <div className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <button key={link.label} onClick={() => setPage(link.page)} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>링크</div>
            <a href="https://github.com/jaesin463" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Github size={13} /> GitHub
            </a>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">© 2026 앱화점. MIT License.</span>
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Built with React + TypeScript</span>
        </div>
      </div>
    </footer>
  );
}
