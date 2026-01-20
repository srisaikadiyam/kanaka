import { cn } from '@/lib/cn';

export function PageHeader({
  title,
  lead,
  eyebrow,
  className
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <header className={cn('space-y-4', className)}>
      {eyebrow ? (
        <p className="inline-flex items-center rounded-full bg-surface-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-ink-900 ring-1 ring-black/10">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
      {lead ? <p className="max-w-2xl text-lg leading-relaxed text-ink-700">{lead}</p> : null}
    </header>
  );
}
