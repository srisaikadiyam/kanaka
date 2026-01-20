export function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl bg-surface-0 p-6 ring-1 ring-black/10">
      <h3 className="text-xl font-semibold tracking-tight text-ink-900">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink-700">{description}</p>
    </div>
  );
}
