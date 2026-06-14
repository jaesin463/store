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
// ─── REQUEST PAGE ───────────────────────────────────────────────────────────

export function RequestPage() {
  const [form, setForm] = useState({ title: "", category: "생산성", description: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">개발 요청</h1>
        <p className="text-sm text-muted-foreground">새 앱 개발 또는 기존 앱 개선을 요청하세요</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">요청서 작성</h2>
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-12 px-6 bg-card border border-border rounded-md text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check size={20} className="text-primary" />
              </div>
              <p className="font-semibold text-foreground">요청이 접수되었습니다</p>
              <p className="text-sm text-muted-foreground">검토 후 이메일로 회신드리겠습니다. 보통 2-3일 내 답변드립니다.</p>
              <button onClick={() => { setSubmitted(false); setForm({ title: "", category: "생산성", description: "", contact: "" }); }} className="mt-2 text-sm text-primary hover:underline">
                새 요청 작성
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>요청 제목 *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="예: 포모도로 타이머 앱 개발" className="px-3 py-2.5 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>카테고리</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="px-3 py-2.5 bg-secondary border border-border rounded text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  {[...Object.keys(CATEGORY_META), "기타"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>상세 설명 *</label>
                <textarea required rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="어떤 앱을 원하시나요? 기능, 플랫폼, 참고 앱 등을 자세히 적어주세요." className="px-3 py-2.5 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-muted-foreground uppercase tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>연락처</label>
                <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="example@email.com" className="px-3 py-2.5 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <button type="submit" className="flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground rounded text-sm font-semibold hover:opacity-90 transition-opacity">
                <Send size={14} /> 요청 보내기
              </button>
            </form>
          )}
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground mb-4">요청 현황</h2>
          <div className="flex flex-col gap-2">
            {REQUESTS.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">아직 등록된 요청 현황이 없습니다.</p>
            ) : REQUESTS.map((req) => (
              <div key={req.id} className="p-4 bg-card border border-border rounded-md flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{req.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{req.id}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{req.date}</span>
                    </div>
                  </div>
                  <RequestStatusBadge status={req.status} />
                </div>
                {req.eta && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock size={11} /> 완료 예정: <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{req.eta}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-card border border-border rounded-md">
            <div className="flex items-start gap-2.5">
              <AlertCircle size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                모든 요청을 수락하기 어려울 수 있습니다. 복잡도, 유용성, 개발 일정을 종합 검토 후 회신드립니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

