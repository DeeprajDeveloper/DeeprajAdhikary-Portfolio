import { HourglassMedium } from '@phosphor-icons/react';
import './PlaceholderBanner.scss';

interface PlaceholderBannerProps {
  message?: string;
}

export function PlaceholderBanner({
  message = 'Content placeholder — fill in after desensitizing project details.',
}: PlaceholderBannerProps) {
  return (
    <div className="placeholder-banner" role="status">
      <HourglassMedium className="placeholder-banner__icon" size={20} weight="duotone" aria-hidden="true" />
      <p className="placeholder-banner__text">{message}</p>
    </div>
  );
}
