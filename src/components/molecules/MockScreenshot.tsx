function resolveAssetPath(src: string) {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}

export function MockScreenshot({ accent, label, index, src, alt }: { accent: string; label: string; index: number; src?: string; alt?: string }) {
  const patterns = [
    <div key="list" className="flex flex-col gap-2 p-3 h-full">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full" style={{ background: accent }} />
        <div className="h-2 rounded-full w-16 bg-white/20" />
        <div className="ml-auto h-2 rounded-full w-6 bg-white/10" />
      </div>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-2 p-2 rounded" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div className="w-5 h-5 rounded" style={{ background: accent + "40" }} />
          <div className="flex-1">
            <div className="h-1.5 rounded-full w-24 bg-white/30 mb-1" />
            <div className="h-1 rounded-full w-16 bg-white/15" />
          </div>
          <div className="h-1.5 rounded-full w-6 bg-white/20" />
        </div>
      ))}
    </div>,
    <div key="chart" className="flex flex-col gap-2 p-3 h-full">
      <div className="h-1.5 rounded-full w-20 bg-white/30 mb-1" />
      <div className="flex items-end gap-1 flex-1 pb-2">
        {[40, 70, 55, 85, 60, 90, 75, 65, 80, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all"
            style={{ height: `${h}%`, background: i === 5 ? accent : accent + "50" }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-1.5 rounded-full w-12 bg-white/20" />
        <div className="h-1.5 rounded-full w-8 bg-white/20" />
      </div>
    </div>,
    <div key="detail" className="flex flex-col gap-2 p-3 h-full">
      <div className="h-2 rounded-full w-28 bg-white/30 mb-1" />
      <div className="rounded p-2 flex flex-col gap-1.5" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div className="h-1.5 rounded-full w-full bg-white/20" />
        <div className="h-1.5 rounded-full w-4/5 bg-white/20" />
        <div className="h-1.5 rounded-full w-3/5 bg-white/15" />
      </div>
      <div className="flex gap-2 mt-1">
        {["", "", ""].map((_, i) => (
          <div key={i} className="flex-1 h-6 rounded" style={{ background: i === 0 ? accent + "60" : "rgba(255,255,255,0.08)" }} />
        ))}
      </div>
      <div className="mt-auto h-7 rounded flex items-center justify-center" style={{ background: accent }}>
        <div className="h-1.5 w-12 rounded-full bg-white/60" />
      </div>
    </div>,
  ];

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="relative rounded-lg overflow-hidden aspect-[16/9] w-full"
        style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)`, border: `1px solid ${accent}30` }}
      >
        {src ? (
          <img src={resolveAssetPath(src)} alt={alt ?? label} className="absolute inset-0 h-full w-full object-contain" loading="lazy" />
        ) : (
          <div className="absolute inset-0 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${accent}20` }}>
              <div className="h-1 w-6 rounded-full bg-white/20" />
              <div className="h-1.5 w-8 rounded-full" style={{ background: accent + "60" }} />
              <div className="flex gap-1">
                <div className="h-1 w-3 rounded-full bg-white/20" />
                <div className="h-1 w-3 rounded-full bg-white/20" />
              </div>
            </div>
            <div className="flex-1">{patterns[index % patterns.length]}</div>
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground text-center">{label}</p>
    </div>
  );
}
