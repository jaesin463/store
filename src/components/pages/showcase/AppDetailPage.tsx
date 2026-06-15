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
// ─── APP DETAIL PAGE ────────────────────────────────────────────────────────

export function AppDetailPage({ app, isDark, onBack, onGoApps }: {
  app: AppItem;
  isDark: boolean;
  onBack: () => void;
  onGoApps: () => void;
}) {
  const [feedbackTab, setFeedbackTab] = useState<"improve" | "bug">("improve");
  const [form, setForm] = useState({ title: "", detail: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);

  const meta = CATEGORY_META[app.category];
  const accentColor = isDark ? (DARK_CATEGORY_META[app.category] ?? meta?.color ?? "#7878a0") : (meta?.color ?? "#7878a0");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft size={15} /> 앱 목록으로
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-10 pb-10 border-b border-border">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{ background: accentColor + "20", color: accentColor, border: `1px solid ${accentColor}40` }}
        >
          {app.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h1 className="text-2xl font-bold text-foreground">{app.name}</h1>
            <CategoryBadge category={app.category} isDark={isDark} />
            <StatusDot status={app.status} />
            {app.isNew && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                NEW
              </span>
            )}
          </div>
          <p className="text-muted-foreground mb-3">{app.tagline}</p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1"><Star size={13} style={{ color: "#f59e0b" }} /> {app.stars}개 별점</span>
            <span className="flex items-center gap-1"><Download size={13} /> {fmtNumber(app.downloads)} 다운로드</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>v{app.version}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {app.platform.map((p) => (
              <span key={p} className="flex items-center gap-1 px-2.5 py-1 rounded border border-border text-xs text-muted-foreground">
                <PlatformIcon p={p} /> {p}
              </span>
            ))}
            <a
              href={app.link}
              className="flex items-center gap-1.5 px-4 py-1 rounded bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <ExternalLink size={13} /> GitHub / 다운로드
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Screenshots */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">스크린샷</h2>
            <div className="grid grid-cols-3 gap-3">
              {app.screenshots.map((sc, i) => (
                <MockScreenshot key={i} accent={sc.accent} label={sc.label} index={i} src={sc.src} alt={sc.alt} />
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">주요 기능</h2>
            <ul className="flex flex-col gap-2">
              {app.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                  {feat}
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Detail */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">기술 스택 & 주요 로직</h2>
            <div className="p-5 bg-card border border-border rounded-md">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {app.tech.map((t) => <TechChip key={t} label={t} />)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{app.techDetail}</p>
            </div>
          </section>

          {/* Patch history for this app */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-4">업데이트 히스토리</h2>
            <div className="flex flex-col gap-3">
              {PATCH_NOTES.filter((n) => n.app === app.name).length === 0 ? (
                <p className="text-sm text-muted-foreground">아직 패치노트가 없습니다.</p>
              ) : (
                PATCH_NOTES.filter((n) => n.app === app.name).map((note, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-md overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                      <span className="text-primary font-medium text-sm" style={{ fontFamily: "'JetBrains Mono', monospace" }}>v{note.version}</span>
                      <VersionBadge type={note.type} />
                      <span className="ml-auto text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{note.date}</span>
                    </div>
                    <ul className="px-4 py-3 flex flex-col gap-2">
                      {note.changes.map((c, ci) => (
                        <li key={ci} className="flex items-start gap-2.5 text-sm">
                          <span className="mt-0.5"><ChangeIcon type={c.type} /></span>
                          <span className="text-muted-foreground">{c.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar: Feedback */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-card border border-border rounded-md overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => { setFeedbackTab("improve"); setSubmitted(false); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                    feedbackTab === "improve" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Lightbulb size={13} /> 개선 요청
                </button>
                <button
                  onClick={() => { setFeedbackTab("bug"); setSubmitted(false); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors ${
                    feedbackTab === "bug" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Bug size={13} /> 버그 제보
                </button>
              </div>

              <div className="p-5">
                {submitted ? (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check size={18} className="text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">접수 완료!</p>
                    <p className="text-xs text-muted-foreground">검토 후 반영하겠습니다. 감사합니다.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ title: "", detail: "", contact: "" }); }} className="text-xs text-primary hover:underline mt-1">
                      다시 작성
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feedbackTab === "improve"
                        ? `${app.name}에 추가됐으면 하는 기능이나 개선하고 싶은 점을 알려주세요.`
                        : `${app.name}에서 발생한 버그를 재현 방법과 함께 알려주세요.`}
                    </p>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {feedbackTab === "improve" ? "개선 제목" : "버그 제목"} *
                      </label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder={feedbackTab === "improve" ? "예: 알림 시간 커스텀 기능" : "예: 저장 버튼 클릭 시 앱 종료"}
                        className="px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {feedbackTab === "improve" ? "상세 내용" : "재현 방법"} *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.detail}
                        onChange={(e) => setForm({ ...form, detail: e.target.value })}
                        placeholder={feedbackTab === "improve" ? "어떤 상황에서 필요한 기능인지 설명해주세요." : "1. 앱 실행\n2. 저장 버튼 클릭\n3. 앱 종료됨"}
                        className="px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        연락처 (선택)
                      </label>
                      <input
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="이메일 또는 GitHub ID"
                        className="px-3 py-2 bg-secondary border border-border rounded text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-1.5 py-2.5 bg-primary text-primary-foreground rounded text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Send size={13} />
                      {feedbackTab === "improve" ? "개선 요청 보내기" : "버그 제보하기"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

