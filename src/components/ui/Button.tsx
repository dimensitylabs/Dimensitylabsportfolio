// src/components/ui/Button.tsx
import Link from 'next/link';

type ButtonVariant = 'primary' | 'outline' | 'outline-light' | 'accent';

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn--primary',
  outline: 'btn--outline',
  'outline-light': 'btn--outline-light',
  accent: 'btn--accent',
};

export function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  style,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const classes = `btn ${variantClass[variant]} ${fullWidth ? 'w-full justify-center' : ''} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes} style={style} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
