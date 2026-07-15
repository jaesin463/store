import { getCollection } from "astro:content";

export async function getShowcaseData() {
  const appEntries = await getCollection("apps");
  const patchNoteEntries = await getCollection("patchNotes");
  const postEntries = await getCollection("posts");

  const patchNotes = patchNoteEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => entry.data)
    .sort((a, b) => b.date.localeCompare(a.date));

  const latestVersionByApp = new Map<string, string>();
  for (const note of patchNotes) {
    const appKey = note.app.toLowerCase();
    if (!latestVersionByApp.has(appKey)) {
      latestVersionByApp.set(appKey, note.version);
    }
  }

  const apps = appEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({
      ...entry.data,
      version: latestVersionByApp.get(entry.data.name.toLowerCase()) ?? entry.data.version,
      slug: entry.id.replace(/\/index$/, ""),
    }))
    .sort((a, b) => a.id - b.id);

  const posts = postEntries
    .filter((entry) => !entry.data.draft)
    .map((entry) => ({ ...entry.data, slug: entry.id.replace(/\/index$/, "") }))
    .sort((a, b) => a.id - b.id);

  return { apps, patchNotes, posts };
}
