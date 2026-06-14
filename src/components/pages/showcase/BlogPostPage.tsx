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
// ─── BLOG POST PAGE ─────────────────────────────────────────────────────────

export function BlogPostPage({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft size={15} /> 블로그 목록으로
      </button>

      <header className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs px-2 py-0.5 rounded font-medium"
            style={{ color: POST_CATEGORY_COLORS[post.category], background: POST_CATEGORY_COLORS[post.category] + "18", fontFamily: "'JetBrains Mono', monospace" }}
          >
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            <Calendar size={11} /> {post.date}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock3 size={11} /> {post.readTime}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground leading-tight mb-4">{post.title}</h1>
        <p className="text-muted-foreground leading-relaxed">{post.summary}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="border-t border-border" />

      <article className="mt-10 flex flex-col gap-6">
        {post.sections.map((section, i) => {
          if (section.type === "h2") {
            return (
              <h2 key={i} className="text-xl font-bold text-foreground mt-4 first:mt-0">
                {section.content as string}
              </h2>
            );
          }
          if (section.type === "p") {
            return (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {section.content as string}
              </p>
            );
          }
          if (section.type === "code") {
            return (
              <div key={i} className="relative">
                <pre
                  className="bg-secondary border border-border rounded-md p-5 text-sm text-foreground overflow-x-auto"
                  style={{ fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.7 }}
                >
                  <code>{section.content as string}</code>
                </pre>
              </div>
            );
          }
          if (section.type === "ul") {
            return (
              <ul key={i} className="flex flex-col gap-2 pl-1">
                {(section.content as string[]).map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </article>
    </div>
  );
}

