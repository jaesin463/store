export type Page = "home" | "apps" | "app-detail" | "patchnotes" | "request" | "blog" | "blog-post" | "about";
export type AppStatus = "active" | "maintenance" | "deprecated";
export type RequestStatus = "accepted" | "in-progress" | "rejected" | "completed";
export type ChangeType = "add" | "fix" | "improve";
export type PatchType = "patch" | "minor" | "major";

export interface AppItem {
  id: number;
  name: string;
  tagline: string;
  description: string;
  category: string;
  tech: string[];
  platform: string[];
  version: string;
  stars: number;
  downloads: number;
  status: AppStatus;
  link: string;
  isNew: boolean;
  isFeatured: boolean;
  features: string[];
  techDetail: string;
  screenshots: { label: string; accent: string; src?: string; alt?: string }[];
}

export interface PatchNote {
  app: string;
  version: string;
  date: string;
  type: PatchType;
  changes: { type: ChangeType; text: string }[];
}

export interface RequestItem {
  id: string;
  title: string;
  status: RequestStatus;
  date: string;
  eta: string | null;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface BlogPost {
  id: number;
  title: string;
  category: "기술" | "트러블슈팅" | "개발일지" | "회고";
  tags: string[];
  date: string;
  readTime: string;
  summary: string;
  sections: { type: "h2" | "p" | "code" | "ul"; content: string | string[] }[];
}
