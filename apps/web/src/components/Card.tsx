export function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl bg-surface-0 p-6 shadow-soft ring-1 ring-black/5">
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-ink-700">{description}</p>
    </div>
  );
}
