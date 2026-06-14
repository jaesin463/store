import type { AppItem, BlogPost, PatchNote } from "../../../features/showcase/types";

export let APPS: AppItem[] = [];
export let PATCH_NOTES: PatchNote[] = [];
export let BLOG_POSTS: BlogPost[] = [];

export function setShowcasePageData({ apps, patchNotes, posts }: { apps?: AppItem[]; patchNotes?: PatchNote[]; posts?: BlogPost[] }) {
  APPS = apps ?? APPS;
  PATCH_NOTES = patchNotes ?? PATCH_NOTES;
  BLOG_POSTS = posts ?? BLOG_POSTS;
}
