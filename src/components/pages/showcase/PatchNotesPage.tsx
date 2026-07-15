import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AlertCircle, ArrowRight, Bug, Calendar, Check, ChevronLeft, ChevronRight, Clock, Clock3, Download, ExternalLink, Github, Lightbulb, Mail, Send, Star, Tag } from "lucide-react";
import { APP_PAGE_SIZE, BLOG_PAGE_SIZE, PATCH_NOTE_PAGE_SIZE } from "../../../features/showcase/constants";
import { REQUESTS, SKILLS } from "../../../features/showcase/data";
import { fmtNumber } from "../../../features/showcase/format";
import { CATEGORY_META, DARK_CATEGORY_META, POST_CATEGORY_COLORS } from "../../../features/showcase/metadata";
import type { AppItem, BlogPost, Page } from "../../../features/showcase/types";
import { PaginationControls } from "../../atoms/PaginationControls";
import { CategoryBadge, ChangeIcon, PlatformIcon, RequestStatusBadge, StatusDot, TechChip, VersionBadge } from "../../atoms/showcaseBadges";
import { AppCard } from "../../molecules/AppCard";
import { MockScreenshot } from "../../molecules/MockScreenshot";
import { APPS, BLOG_POSTS, PATCH_NOTES } from "./showcasePageData";
// ─── PATCH NOTES PAGE ───────────────────────────────────────────────────────

export function PatchNotesPage() {
  const appNames = ["전체", ...Array.from(new Set(PATCH_NOTES.map((n) => n.app)))];
  const getInitialApp = () => {
    if (typeof window === "undefined") return "전체";
    const appParam = new URLSearchParams(window.location.search).get("app");
    return appParam && appNames.includes(appParam) ? appParam : "전체";
  };
  const [selectedApp, setSelectedApp] = useState(getInitialApp);
  const [currentPage, setCurrentPage] = useState(1);
  const filtered = selectedApp === "전체" ? PATCH_NOTES : PATCH_NOTES.filter((n) => n.app === selectedApp);
  const pagedNotes = filtered.slice((currentPage - 1) * PATCH_NOTE_PAGE_SIZE, currentPage * PATCH_NOTE_PAGE_SIZE);

  useEffect(() => {
    function syncSelectedAppFromUrl() {
      setSelectedApp(getInitialApp());
      setCurrentPage(1);
    }

    syncSelectedAppFromUrl();
    window.addEventListener("popstate", syncSelectedAppFromUrl);
    return () => window.removeEventListener("popstate", syncSelectedAppFromUrl);
  }, []);

  function handleFilterClick(name: string) {
    setSelectedApp(name);
    setCurrentPage(1);

    const url = new URL(window.location.href);
    if (name === "전체") {
      url.searchParams.delete("app");
    } else {
      url.searchParams.set("app", name);
    }
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">패치노트</h1>
        <p className="text-sm text-muted-foreground">앱별 업데이트 내역</p>
      </div>
      <div className="flex gap-2 flex-wrap mb-8">
        {appNames.map((name) => (
          <button
            key={name}
            onClick={() => handleFilterClick(name)}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              selectedApp === name ? "bg-primary text-primary-foreground font-medium" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {pagedNotes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">아직 등록된 패치노트가 없습니다.</p>
        ) : pagedNotes.map((note, idx) => (
          <div key={idx} className="bg-card border border-border rounded-md overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">{note.app}</span>
                  <span className="text-primary" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px" }}>v{note.version}</span>
                  <VersionBadge type={note.type} />
                </div>
              </div>
              <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{note.date}</span>
            </div>
            <ul className="px-5 py-4 flex flex-col gap-2.5">
              {note.changes.map((change, ci) => (
                <li key={ci} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 w-4 flex-shrink-0"><ChangeIcon type={change.type} /></span>
                  <span className="text-muted-foreground leading-relaxed">{change.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={PATCH_NOTE_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

