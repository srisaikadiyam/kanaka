import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'md' | 'lg';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type,
  ...rest
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';
  const sizes: Record<ButtonSize, string> = {
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-5 text-base'
  };
  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-ink-900 text-white ring-1 ring-black/10 hover:bg-ink-700',
    secondary: 'bg-surface-0 text-ink-900 ring-1 ring-black/15 hover:bg-surface-50',
    ghost: 'bg-transparent text-ink-900 hover:bg-surface-100'
  };

  const classes = cn(base, sizes[size], variants[variant], className);

  return (
    <button type={type ?? 'button'} {...rest} className={classes}>
      {children}
    </button>
  );
}

