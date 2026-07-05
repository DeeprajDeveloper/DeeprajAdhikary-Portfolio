import { Nav, Footer } from '@design-system/index';
import { pages } from '@data/index';
import './PlaceholderPage.scss';

export default function Work() {
  const { title, body } = pages.work;

  return (
    <div className="placeholder-page">
      <Nav />
      <main className="placeholder-page__main">
        <h1>{title}</h1>
        <p>{body}</p>
      </main>
      <Footer />
    </div>
  );
}
