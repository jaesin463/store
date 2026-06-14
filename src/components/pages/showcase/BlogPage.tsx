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
// ─── BLOG PAGE ──────────────────────────────────────────────────────────────

export function BlogPage({ goToPost }: { goToPost: (p: BlogPost) => void }) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const categories = ["전체", "기술", "트러블슈팅", "개발일지", "회고"];
  const filtered = activeCategory === "전체" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === activeCategory);
  const pagedPosts = filtered.slice((currentPage - 1) * BLOG_PAGE_SIZE, currentPage * BLOG_PAGE_SIZE);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">블로그</h1>
        <p className="text-sm text-muted-foreground">기술 아티클, 트러블슈팅, 개발 일지</p>
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
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {pagedPosts.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 sm:col-span-2">아직 등록된 글이 없습니다.</p>
        ) : pagedPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => goToPost(post)}
            className="bg-card border border-border rounded-md p-6 flex flex-col gap-3 text-left hover:border-primary/30 transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{ color: POST_CATEGORY_COLORS[post.category], background: POST_CATEGORY_COLORS[post.category] + "18", fontFamily: "'JetBrains Mono', monospace" }}
              >
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <Calendar size={11} /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock3 size={11} /> {post.readTime}
                </span>
              </div>
            </div>
            <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.summary}</p>
            <div className="flex flex-wrap gap-1 mt-auto pt-1">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  #{tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
      <PaginationControls
        currentPage={currentPage}
        totalItems={filtered.length}
        pageSize={BLOG_PAGE_SIZE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

