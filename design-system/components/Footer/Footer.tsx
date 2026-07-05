import { ArrowSquareOut } from '@phosphor-icons/react';
import { site, footerLinks } from '@data/site';
import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">
          &copy; {year} {site.fullName} — Systems thinking across BA, Dev, and QE
        </p>

        <nav className="site-footer__links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
              {link.external && (
                <ArrowSquareOut size={12} weight="bold" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
