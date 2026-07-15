import { useState } from "react";
import type { AppItem, BlogPost, Page, PatchNote } from "../../features/showcase/types";
import { AboutPage, AppDetailPage, AppsPage, BlogPage, BlogPostPage, HomePage, PatchNotesPage, RequestPage, setShowcasePageData } from "../pages/showcasePages";
import { Footer } from "../organisms/Footer";
import { Nav } from "../organisms/Nav";
import "../../styles/figma/index.css";

// ─── APP ────────────────────────────────────────────────────────────────────

interface AppShowcaseTemplateProps {
  apps?: AppItem[];
  patchNotes?: PatchNote[];
  posts?: BlogPost[];
  initialPage?: Page;
  selectedApp?: AppItem | null;
  selectedPost?: BlogPost | null;
}

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, "");

function pathForPage(page: Page) {
  const pathMap: Partial<Record<Page, string>> = {
    home: "/",
    apps: "/apps/",
    patchnotes: "/patch-notes/",
    request: "/request/",
    blog: "/blog/",
    about: "/about/",
  };
  return `${BASE_PATH}${pathMap[page] ?? "/"}`;
}

function pathForAppPatchNotes(app: AppItem) {
  return `${BASE_PATH}/patch-notes/?app=${encodeURIComponent(app.name)}`;
}

function pathForApp(app: AppItem) {
  const slug = app.slug ?? app.name.toLowerCase().replace(/\s+/g, "-");
  return `${BASE_PATH}/apps/${slug}/`;
}

function pathForPost(post: BlogPost) {
  const slug = post.slug ?? String(post.id);
  return `${BASE_PATH}/posts/${slug}/`;
}

export default function App({ apps, patchNotes, posts, initialPage = "home", selectedApp: initialSelectedApp = null, selectedPost: initialSelectedPost = null }: AppShowcaseTemplateProps) {
  setShowcasePageData({ apps, patchNotes, posts });

  const [page] = useState<Page>(initialPage);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedApp] = useState<AppItem | null>(initialSelectedApp);
  const [selectedPost] = useState<BlogPost | null>(initialSelectedPost);

  function navigate(p: Page) {
    setMobileOpen(false);
    window.location.href = pathForPage(p);
  }

  function goToApp(app: AppItem) {
    setMobileOpen(false);
    window.location.href = pathForApp(app);
  }

  function goToPost(post: BlogPost) {
    setMobileOpen(false);
    window.location.href = pathForPost(post);
  }

  return (
    <div
      className={`min-h-screen bg-background text-foreground${isDark ? " dark" : ""}`}
      style={{ fontFamily: "'Noto Sans KR', Inter, sans-serif" }}
    >
      <Nav
        page={page}
        setPage={navigate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <main className="pt-14">
        {page === "home" && <HomePage setPage={navigate} goToApp={goToApp} goToPost={goToPost} isDark={isDark} />}
        {page === "apps" && <AppsPage isDark={isDark} goToApp={goToApp} />}
        {page === "app-detail" && selectedApp && (
          <AppDetailPage
            app={selectedApp}
            isDark={isDark}
            onBack={() => navigate("apps")}
            onGoPatchNotes={() => {
              setMobileOpen(false);
              window.location.href = pathForAppPatchNotes(selectedApp);
            }}
          />
        )}
        {page === "patchnotes" && <PatchNotesPage />}
        {page === "blog" && <BlogPage goToPost={goToPost} />}
        {page === "blog-post" && selectedPost && (
          <BlogPostPage post={selectedPost} onBack={() => navigate("blog")} />
        )}
        {page === "request" && <RequestPage />}
        {page === "about" && <AboutPage isDark={isDark} />}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
}



