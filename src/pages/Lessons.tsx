import { Lightbulb } from '@phosphor-icons/react';
import { PageHeader } from '@design-system/index';
import { lessons } from '@data/lessons';
import { usePageTitle } from '@/hooks/usePageTitle';
import './Lessons.scss';

export function LessonsPage() {
  usePageTitle('Lessons Learned');

  return (
    <div className="inner-page">
      <div className="inner-page__container">
        <PageHeader
          eyebrow="Insights"
          title="Lessons from enterprise work"
          description="Insights gathered from nearly a decade working on a large wealth management platform."
        />

        <div className="lessons-list">
          {lessons.map((lesson, index) => (
            <article key={lesson.id} className="lesson-card">
              <span className="lesson-card__number">{String(index + 1).padStart(2, '0')}</span>
              <div className="lesson-card__content">
                <h2 className="lesson-card__title">
                  <Lightbulb size={18} weight="duotone" aria-hidden="true" />
                  {lesson.title}
                </h2>
                <p className="lesson-card__insight">{lesson.insight}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
