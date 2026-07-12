import { Routes, Route } from 'react-router-dom';
import { Nav, Footer, ClickSpark } from '@design-system/index';
import { PageTransition } from '@/components/PageTransition/PageTransition';
import { ScrollToTop } from '@/components/ScrollToTop/ScrollToTop';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { HomePage } from '@/pages/Home';
import { HowIThinkPage } from '@/pages/HowIThink';
import { PerspectivesPage } from '@/pages/Perspectives';
import { CaseStudiesPage } from '@/pages/CaseStudies';
import { CaseStudyDetailPage } from '@/pages/CaseStudyDetail';
import { ProjectsPage } from '@/pages/Projects';
import { ProjectDetailPage } from '@/pages/ProjectDetail';
import { ArtifactsPage } from '@/pages/Artifacts';
import { LessonsPage } from '@/pages/Lessons';
import { ExploringPage } from '@/pages/Exploring';
import { NotFoundPage } from '@/pages/NotFound';

export default function App() {
  useKeyboardShortcuts();

  return (
    <div className="page">
      <ScrollToTop />
      <div className="page__grid" aria-hidden="true" />
      <Nav />
      <ClickSpark
        sparkColor="#f5c518"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="page__body">
          <main className="page__main">
            <PageTransition>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/thinking" element={<HowIThinkPage />} />
                <Route path="/perspectives" element={<PerspectivesPage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/artifacts" element={<ArtifactsPage />} />
                <Route path="/lessons" element={<LessonsPage />} />
                <Route path="/exploring" element={<ExploringPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer variant="page" />
        </div>
      </ClickSpark>
    </div>
  );
}
