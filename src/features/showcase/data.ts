import type { AppItem, BlogPost, PatchNote, RequestItem, SkillGroup } from "./types";

export const APPS: AppItem[] = [];

export const PATCH_NOTES: PatchNote[] = [];

export const REQUESTS: RequestItem[] = [];

export const SKILLS: SkillGroup[] = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"] },
  { category: "Mobile", items: ["Flutter", "React Native", "Expo", "Dart"] },
  { category: "Backend", items: ["Python", "FastAPI", "Node.js", "PostgreSQL", "Redis"] },
  { category: "Desktop", items: ["Electron", "Tauri", "Rust"] },
  { category: "DevOps", items: ["Docker", "GitHub Actions", "Vercel", "AWS"] },
];

export const BLOG_POSTS: BlogPost[] = [];
