import { Link } from 'react-router-dom';
import { footer, site } from '@data/index';
import './Footer.scss';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">
          © {year} {site.name}. {footer.copyright}
        </p>
        <div className="site-footer__links">
          {footer.links.map(({ label, href, external, internal }) => {
            if (internal) {
              return (
                <Link key={label} to={href}>
                  {label}
                </Link>
              );
            }

            return (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
