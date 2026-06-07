import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'fill.primary'   | 'fill.secondary'   | 'fill.inverse'   | 'fill.disabled'
  | 'outline.primary' | 'outline.disabled'
  | 'ghost.primary'  | 'ghost.secondary'  | 'ghost.inverse'  | 'ghost.disabled'
  | 'ghost.underline.primary' | 'ghost.underline.secondary'
  | 'ghost.underline.inverse' | 'ghost.underline.disabled';

export type ButtonSize = 'large' | 'medium';

export interface ButtonProps {
  variant?:      ButtonVariant;
  size?:         ButtonSize;
  leadingIcon?:  React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?:     boolean;
  loading?:      boolean;
  fullWidth?:    boolean;
  type?:         'button' | 'submit' | 'reset';
  onClick?:      React.MouseEventHandler<HTMLButtonElement>;
  children:      React.ReactNode;
  className?:    string;
  'aria-label'?: string;
}

const variantClass: Record<ButtonVariant, string> = {
  'fill.primary':              styles.fillPrimary,
  'fill.secondary':            styles.fillSecondary,
  'fill.inverse':              styles.fillInverse,
  'fill.disabled':             styles.fillDisabled,
  'outline.primary':           styles.outlinePrimary,
  'outline.disabled':          styles.outlineDisabled,
  'ghost.primary':             styles.ghostPrimary,
  'ghost.secondary':           styles.ghostSecondary,
  'ghost.inverse':             styles.ghostInverse,
  'ghost.disabled':            styles.ghostDisabled,
  'ghost.underline.primary':   styles.ghostUnderlinePrimary,
  'ghost.underline.secondary': styles.ghostUnderlineSecondary,
  'ghost.underline.inverse':   styles.ghostUnderlineInverse,
  'ghost.underline.disabled':  styles.ghostUnderlineDisabled,
};

export function Button({
  variant      = 'fill.primary',
  size         = 'large',
  leadingIcon,
  trailingIcon,
  disabled     = false,
  loading      = false,
  fullWidth    = false,
  type         = 'button',
  onClick,
  children,
  className,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading || variant.endsWith('.disabled');

  const cls = [
    styles.base,
    size === 'large' ? styles.sizeLarge : styles.sizeMedium,
    variantClass[variant],
    fullWidth   && styles.fullWidth,
    loading     && styles.loading,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={cls}
      onClick={isDisabled ? undefined : onClick}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}

      {!loading && leadingIcon && (
        <span className={styles.iconSlot} aria-hidden="true">
          {leadingIcon}
        </span>
      )}

      <span className={styles.label}>{children}</span>

      {!loading && trailingIcon && (
        <span className={styles.iconSlot} aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}

export default Button;
