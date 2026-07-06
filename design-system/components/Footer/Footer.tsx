import { FilePdf, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { site, footerLinks } from '@data/site';
import './Footer.scss';

interface FooterProps {
  variant?: 'nav' | 'page';
}

const footerIcons: Record<(typeof footerLinks)[number]['label'], Icon> = {
  LinkedIn: LinkedinLogo,
  GitHub: GithubLogo,
  Resume: FilePdf,
};

export function Footer({ variant = 'page' }: FooterProps) {
  const year = new Date().getFullYear();
  const iconSize = variant === 'nav' ? 22 : 24;

  return (
    <footer className={`site-footer site-footer--${variant}`}>
      <p className="site-footer__copy">
        &copy; {year} {site.fullName}
      </p>

      <nav className="site-footer__links" aria-label="Footer links">
        {footerLinks.map((link) => {
          const IconComponent = footerIcons[link.label];

          return (
            <a
              key={link.label}
              href={link.href}
              className="site-footer__link"
              aria-label={link.label}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <IconComponent size={iconSize} weight="regular" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
