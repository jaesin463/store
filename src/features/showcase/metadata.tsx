import type { ReactNode } from "react";
import { BookOpen, Clipboard, CloudRain, Code2, DollarSign, Zap } from "lucide-react";

export const CATEGORY_META: Record<string, { icon: ReactNode; color: string }> = {
  "생산성": { icon: <Zap size={12} />, color: "#0099bb" },
  "개발도구": { icon: <Code2 size={12} />, color: "#7c3aed" },
  "금융": { icon: <DollarSign size={12} />, color: "#059669" },
  "교육": { icon: <BookOpen size={12} />, color: "#db2777" },
  "날씨": { icon: <CloudRain size={12} />, color: "#2563eb" },
  "유틸": { icon: <Clipboard size={12} />, color: "#d97706" },
};

export const DARK_CATEGORY_META: Record<string, string> = {
  "생산성": "#00d4ff",
  "개발도구": "#a78bfa",
  "금융": "#34d399",
  "교육": "#f472b6",
  "날씨": "#60a5fa",
  "유틸": "#fbbf24",
};

export const POST_CATEGORY_COLORS: Record<string, string> = {
  "기술": "#7c3aed",
  "트러블슈팅": "#dc2626",
  "개발일지": "#0099bb",
  "회고": "#059669",
};
