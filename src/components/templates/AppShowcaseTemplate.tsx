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
}

export default function App({ apps, patchNotes, posts }: AppShowcaseTemplateProps) {
  setShowcasePageData({ apps, patchNotes, posts });

  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  function navigate(p: Page) {
    setPage(p);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToApp(app: AppItem) {
    setSelectedApp(app);
    setPage("app-detail");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPost(post: BlogPost) {
    setSelectedPost(post);
    setPage("blog-post");
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <AppDetailPage app={selectedApp} isDark={isDark} onBack={() => navigate("apps")} onGoApps={() => navigate("apps")} />
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



