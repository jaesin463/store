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
// ─── HOME PAGE ──────────────────────────────────────────────────────────────

export function HomePage({ setPage, goToApp, goToPost, isDark }: {
  setPage: (p: Page) => void;
  goToApp: (a: AppItem) => void;
  goToPost: (p: BlogPost) => void;
  isDark: boolean;
}) {
  const featured = APPS.filter((a) => a.isFeatured);
  const totalDownloads = APPS.reduce((s, a) => s + a.downloads, 0);
  const avgStars = (APPS.reduce((s, a) => s + a.stars, 0) / APPS.length).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <section className="pt-20 pb-16 border-b border-border">
        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 6px currentColor" }} />
            <span className="text-xs text-primary uppercase tracking-widest" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              당신이 찾던 모든 것
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-tight">
            앱화점
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            AI와 함께 직접 개발한 다양한 앱들을 모아두었습니다.
            <br className="hidden sm:block" />
            다운로드하거나, 개선 요청을 보내거나, 새 앱을 요청해 보세요.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("apps")}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              앱 목록 보기 <ArrowRight size={15} />
            </button>
            <button
              onClick={() => setPage("request")}
              className="flex items-center gap-2 px-5 py-2.5 border border-border rounded text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              개발 요청하기
            </button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-0 border border-border rounded-md overflow-hidden max-w-xl">
          {[
            { label: "등록된 앱", value: `${APPS.length}개` },
            { label: "총 다운로드", value: fmtNumber(totalDownloads) },
            { label: "평균 별점", value: `★ ${avgStars}` },
          ].map((stat, i) => (
            <div key={stat.label} className={`px-5 py-4 ${i < 2 ? "border-r border-border" : ""}`}>
              <div className="text-xl font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">추천 앱</h2>
          <button onClick={() => setPage("apps")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            전체 보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featured.map((app) => <AppCard key={app.id} app={app} isDark={isDark} onDetail={goToApp} />)}
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">최근 블로그</h2>
          <button onClick={() => setPage("blog")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
            전체 보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BLOG_POSTS.slice(0, 2).map((post) => (
            <button
              key={post.id}
              onClick={() => goToPost(post)}
              className="bg-card border border-border rounded-md p-5 flex flex-col gap-3 text-left hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded font-medium"
                  style={{ color: POST_CATEGORY_COLORS[post.category], background: POST_CATEGORY_COLORS[post.category] + "18", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {post.category}
                </span>
                <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{post.date}</span>
              </div>
              <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.summary}</p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="py-14 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground mb-6">카테고리</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(CATEGORY_META).map(([cat, meta]) => {
            const color = isDark ? (DARK_CATEGORY_META[cat] ?? meta.color) : meta.color;
            return (
              <button
                key={cat}
                onClick={() => setPage("apps")}
                className="flex items-center gap-3 p-4 bg-card border border-border rounded-md hover:border-primary/30 transition-colors text-left group"
              >
                <span style={{ color }}>{meta.icon}</span>
                <div>
                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{cat}</div>
                  <div className="text-xs text-muted-foreground">{APPS.filter((a) => a.category === cat).length}개</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

