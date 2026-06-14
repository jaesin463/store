import type { ReactNode } from "react";
import { Check, Clock, Globe, Monitor, Package, Smartphone, X } from "lucide-react";
import { CATEGORY_META, DARK_CATEGORY_META } from "../../features/showcase/metadata";
import type { AppStatus, ChangeType, PatchType, RequestStatus } from "../../features/showcase/types";

export function PlatformIcon({ p }: { p: string }) {
  if (p === "Web") return <Globe size={11} />;
  if (p === "Android" || p === "iOS") return <Smartphone size={11} />;
  return <Monitor size={11} />;
}

export function CategoryBadge({ category, isDark }: { category: string; isDark: boolean }) {
  const meta = CATEGORY_META[category] ?? { icon: <Package size={12} />, color: "#7878a0" };
  const color = isDark ? (DARK_CATEGORY_META[category] ?? meta.color) : meta.color;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
      style={{ color, background: color + "18", fontFamily: "'JetBrains Mono', monospace" }}
    >
      {meta.icon}
      {category}
    </span>
  );
}

export function TechChip({ label }: { label: string }) {
  return (
    <span
      className="px-1.5 py-0.5 text-xs rounded border border-border text-muted-foreground"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
    >
      {label}
    </span>
  );
}

export function StatusDot({ status }: { status: AppStatus }) {
  const map: Record<AppStatus, { color: string; label: string }> = {
    active: { color: "#22c55e", label: "운영 중" },
    maintenance: { color: "#f59e0b", label: "점검 중" },
    deprecated: { color: "#ef4444", label: "지원 종료" },
  };
  const s = map[status];
  return (
    <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>
      <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  const map: Record<RequestStatus, { icon: ReactNode; label: string; color: string; bg: string }> = {
    accepted: { icon: <Check size={11} />, label: "수락됨", color: "#0099bb", bg: "#0099bb18" },
    "in-progress": { icon: <Clock size={11} />, label: "개발 중", color: "#d97706", bg: "#d9770618" },
    rejected: { icon: <X size={11} />, label: "거절됨", color: "#ef4444", bg: "#ef444418" },
    completed: { icon: <Check size={11} />, label: "완료됨", color: "#22c55e", bg: "#22c55e18" },
  };
  const s = map[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium"
      style={{ color: s.color, background: s.bg, fontFamily: "'JetBrains Mono', monospace" }}
    >
      {s.icon} {s.label}
    </span>
  );
}

export function VersionBadge({ type }: { type: PatchType }) {
  const map: Record<PatchType, { label: string; color: string }> = {
    major: { label: "MAJOR", color: "#ef4444" },
    minor: { label: "MINOR", color: "#0099bb" },
    patch: { label: "PATCH", color: "#7878a0" },
  };
  const s = map[type];
  return (
    <span
      className="text-xs px-1.5 py-0.5 rounded border"
      style={{ color: s.color, borderColor: s.color + "50", fontFamily: "'JetBrains Mono', monospace" }}
    >
      {s.label}
    </span>
  );
}

export function ChangeIcon({ type }: { type: ChangeType }) {
  if (type === "add") return <span style={{ color: "#22c55e", fontFamily: "monospace" }} className="text-xs font-bold">+</span>;
  if (type === "fix") return <span style={{ color: "#f472b6", fontFamily: "monospace" }} className="text-xs font-bold">!</span>;
  return <span style={{ color: "#f59e0b", fontFamily: "monospace" }} className="text-xs font-bold">~</span>;
}
