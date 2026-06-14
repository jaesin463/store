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
// ─── ABOUT PAGE ─────────────────────────────────────────────────────────────

export function AboutPage({ isDark }: { isDark: boolean }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-foreground mb-1">개발자 소개</h1>
        <p className="text-sm text-muted-foreground">포트폴리오 및 기술 스택</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-md p-6 flex flex-col gap-4 sticky top-20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2" style={{ borderColor: "#0099bb40", background: "#0099bb10", color: "#0099bb" }}>
              JS
            </div>
            <div>
              <h2 className="font-bold text-foreground text-lg">이재신</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Full-Stack / Mobile Developer</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI와 함께 새로운 기술 스택을 활용하며, 다양한 카테고리의 프로그램을 만드는 곳
              <br className="hidden sm:block"/>
              실용적인 도구를 개발하고 지속적으로 개선해 나가는 것이 목표입니다.
            </p>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Github size={14} />
                <a href="https://github.com/jaesin463" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">github.com/jaesin463</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={14} />
                <span>jaesin463@gmail.com</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
              {[
                { label: "제작 앱", value: `${APPS.length}개` },
                { label: "총 다운로드", value: fmtNumber(APPS.reduce((s, a) => s + a.downloads, 0)) },
                { label: "GitHub 스타", value: fmtNumber(APPS.reduce((s, a) => s + a.stars, 0)) },
                { label: "개발 경력", value: "2년+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-base font-bold text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">기술 스택</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILLS.map((sg) => (
                <div key={sg.category} className="bg-card border border-border rounded-md p-4">
                  <div className="text-xs text-primary uppercase tracking-wide mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{sg.category}</div>
                  <div className="flex flex-wrap gap-1.5">{sg.items.map((item) => <TechChip key={item} label={item} />)}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">제작한 앱</h3>
            <div className="flex flex-col gap-2">
              {APPS.map((app) => (
                <div key={app.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-md hover:border-primary/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-sm text-foreground">{app.name}</span>
                      <CategoryBadge category={app.category} isDark={isDark} />
                      <StatusDot status={app.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{app.tagline}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-shrink-0">
                    <span className="flex items-center gap-1"><Star size={11} style={{ color: "#f59e0b" }} /> {app.stars}</span>
                    <span className="hidden sm:block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>v{app.version}</span>
                    <a href={app.link} className="p-1.5 hover:text-primary transition-colors"><ExternalLink size={13} /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

