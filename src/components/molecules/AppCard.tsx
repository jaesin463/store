import { Download, ExternalLink, Star } from "lucide-react";
import { DARK_CATEGORY_META, CATEGORY_META } from "../../features/showcase/metadata";
import { fmtNumber } from "../../features/showcase/format";
import type { AppItem } from "../../features/showcase/types";
import { CategoryBadge, PlatformIcon, StatusDot, TechChip } from "../atoms/showcaseBadges";

export function AppCard({ app, isDark, onDetail }: { app: AppItem; isDark: boolean; onDetail: (a: AppItem) => void }) {
  const meta = CATEGORY_META[app.category];
  const accentColor = isDark ? (DARK_CATEGORY_META[app.category] ?? meta?.color ?? "#7878a0") : (meta?.color ?? "#7878a0");

  return (
    <div className="bg-card border border-border rounded-md p-5 flex flex-col gap-3 hover:border-border/80 transition-colors group relative overflow-hidden min-h-[311px]">
      <div
        className="absolute top-0 left-0 w-full h-px opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
      />
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-foreground">{app.name}</span>
            {app.isNew && (
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                NEW
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{app.tagline}</span>
        </div>
        <CategoryBadge category={app.category} isDark={isDark} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[63px]">{app.description}</p>
      <div className="flex flex-wrap content-end gap-1 min-h-[50px] max-h-[50px] overflow-hidden">
        {app.tech.map((t) => <TechChip key={t} label={t} />)}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={11} style={{ color: "#f59e0b" }} /> {app.stars}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Download size={11} /> {fmtNumber(app.downloads)}
          </span>
          <StatusDot status={app.status} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>v{app.version}</span>
          <div className="flex gap-1">
            {app.platform.map((p) => (
              <span key={p} className="text-muted-foreground"><PlatformIcon p={p} /></span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onDetail(app)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 hover:text-primary transition-colors"
        >
          자세히 보기
        </button>
        <a
          href={app.link}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}
