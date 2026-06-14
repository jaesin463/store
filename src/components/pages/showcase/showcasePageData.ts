import { APPS as FALLBACK_APPS, BLOG_POSTS as FALLBACK_BLOG_POSTS, PATCH_NOTES as FALLBACK_PATCH_NOTES } from "../../../features/showcase/data";
import type { AppItem, BlogPost, PatchNote } from "../../../features/showcase/types";

export let APPS: AppItem[] = [...FALLBACK_APPS];
export let PATCH_NOTES: PatchNote[] = [...FALLBACK_PATCH_NOTES];
export let BLOG_POSTS: BlogPost[] = [...FALLBACK_BLOG_POSTS];

export function setShowcasePageData({ apps, patchNotes, posts }: { apps?: AppItem[]; patchNotes?: PatchNote[]; posts?: BlogPost[] }) {
  APPS = apps ?? APPS;
  PATCH_NOTES = patchNotes ?? PATCH_NOTES;
  BLOG_POSTS = posts ?? BLOG_POSTS;
}
