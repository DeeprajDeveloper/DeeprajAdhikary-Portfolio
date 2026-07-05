import { Nav, Footer } from '@design-system/index';
import { pages } from '@data/index';
import './PlaceholderPage.scss';

export default function Contact() {
  const { title, body } = pages.contact;

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
