import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AppItem } from "../../features/showcase/types";
import { MockScreenshot } from "./MockScreenshot";

type Screenshot = AppItem["screenshots"][number];

function resolveAssetPath(src: string) {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

export function ScreenshotCarousel({ screenshots }: { screenshots: Screenshot[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = screenshots.length;
  const active = screenshots[activeIndex];

  if (total === 0) {
    return <p className="text-sm text-muted-foreground">아직 등록된 스크린샷이 없습니다.</p>;
  }

  function goTo(index: number) {
    setActiveIndex((index + total) % total);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative bg-card border border-border rounded-md overflow-hidden"
        style={{ borderColor: active.accent + "35" }}
      >
        <div className="h-[300px] sm:h-[420px] bg-secondary/35 flex items-center justify-center p-4 sm:p-6">
          {active.src ? (
            <img
              src={resolveAssetPath(active.src)}
              alt={active.alt ?? active.label}
              className="max-h-full max-w-full object-contain rounded"
              loading="lazy"
            />
          ) : (
            <div className="w-full max-w-[560px]">
              <MockScreenshot accent={active.accent} label={active.label} index={activeIndex} />
            </div>
          )}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded border border-border bg-background/85 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center justify-center backdrop-blur-sm"
              aria-label="이전 스크린샷"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded border border-border bg-background/85 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center justify-center backdrop-blur-sm"
              aria-label="다음 스크린샷"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {active.label} · {activeIndex + 1}/{total}
        </p>
        {total > 1 && (
          <div className="flex items-center gap-1.5">
            {screenshots.map((screenshot, index) => (
              <button
                key={`${screenshot.label}-${index}`}
                type="button"
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/60"
                }`}
                aria-label={`${index + 1}번째 스크린샷 보기`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
