import { useState } from "react";
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
// ─── APPS PAGE ──────────────────────────────────────────────────────────────

export function AppsPage({ isDark, goToApp }: { isDark: boolean; goToApp: (a: AppItem) => void }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const categories = ["전체", ...Object.keys(CATEGORY_META)];
  const filtered = activeCategory === "전체" ? APPS : APPS.filter((a) => a.category === activeCategory);
  const pagedApps = filtered.slice((currentPage - 1) * APP_PAGE_SIZE, currentPage * APP_PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">앱 목록</h1>
        <p className="text-sm text-muted-foreground">총 {APPS.length}개의 앱</p>
      </div>
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded text-sm transition-colors ${
              activeCategory === cat ? "bg-primary text-primary-foreground font-medium" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat}
            {cat !== "전체" && (
              <span className="ml-1.5 opacity-60 text-xs">{APPS.filter((a) => a.category === cat).length}</span>
            )}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedApps.map((app) => <AppCard key={app.id} app={app} isDark={isDark} onDetail={goToApp} />)}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={APP_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

