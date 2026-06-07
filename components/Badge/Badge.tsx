import React from 'react';
import styles from './Badge.module.css';

/* ─── Info badge ──────────────────────────────── */
export type InfoVariant = 'ember' | 'aqua' | 'royal' | 'crimson' | 'molten' | 'sold-out' | 'success';

export interface InfoBadgeProps {
  type:      'info';
  variant:   InfoVariant;
  children:  React.ReactNode;
  className?: string;
}

/* ─── Rating badge ────────────────────────────── */
export type RatingVariant = 'green' | 'yellow' | 'red';

export interface RatingBadgeProps {
  type:      'rating';
  variant:   RatingVariant;
  score:     number;
  className?: string;
}

/* ─── Notification badge ──────────────────────── */
export interface NumberNotificationProps {
  type:      'notification';
  variant:   'number';
  count:     number;
  className?: string;
}

export interface DotNotificationProps {
  type:      'notification';
  variant:   'dot';
  className?: string;
}

export type BadgeProps =
  | InfoBadgeProps
  | RatingBadgeProps
  | NumberNotificationProps
  | DotNotificationProps;

const infoVariantClass: Record<InfoVariant, string> = {
  'ember':    styles.infoEmber,
  'aqua':     styles.infoAqua,
  'royal':    styles.infoRoyal,
  'crimson':  styles.infoCrimson,
  'molten':   styles.infoMolten,
  'sold-out': styles.infoSoldOut,
  'success':  styles.infoSuccess,
};

const ratingVariantClass: Record<RatingVariant, string> = {
  green:  styles.ratingGreen,
  yellow: styles.ratingYellow,
  red:    styles.ratingRed,
};

export function Badge(props: BadgeProps) {
  /* ── Info ─────────────────────────────────── */
  if (props.type === 'info') {
    const { variant, children, className } = props;
    return (
      <span
        className={[styles.info, infoVariantClass[variant], className].filter(Boolean).join(' ')}
        aria-label={typeof children === 'string' ? children : undefined}
      >
        {children}
      </span>
    );
  }

  /* ── Rating ───────────────────────────────── */
  if (props.type === 'rating') {
    const { variant, score, className } = props;
    return (
      <span
        className={[styles.rating, ratingVariantClass[variant], className].filter(Boolean).join(' ')}
        aria-label={`${score.toFixed(1)} out of 5 stars`}
      >
        <span>{score.toFixed(1)}</span>
        {/* Star icon — inline SVG so it inherits currentColor */}
        <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
          <path d="M5 0.5l1.24 2.65 2.89.37-2.1 1.96.5 2.87L5 6.94 2.47 8.35l.5-2.87-2.1-1.96 2.89-.37L5 .5z" />
        </svg>
      </span>
    );
  }

  /* ── Notification ─────────────────────────── */
  if (props.type === 'notification') {
    if (props.variant === 'dot') {
      return (
        <span
          role="status"
          aria-label="New activity"
          className={[styles.notificationDot, props.className].filter(Boolean).join(' ')}
        />
      );
    }
    const displayCount = props.count > 99 ? '99+' : String(props.count);
    return (
      <span
        className={[styles.notificationNumber, props.className].filter(Boolean).join(' ')}
        aria-label={`${props.count} unread`}
      >
        {displayCount}
      </span>
    );
  }

  return null;
}

export default Badge;
