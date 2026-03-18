import { bonusDownloads } from "@/lib/session-data";

type BonusDownloadsProps = {
  title?: string;
  description?: string;
  compact?: boolean;
  anchorId?: string;
};

export function BonusDownloads({
  title = "Bonus library",
  description = "A curated set of bonus guides available alongside the retreat messages.",
  compact = false,
  anchorId,
}: BonusDownloadsProps) {
  return (
    <section id={anchorId} className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="editorial-label">Bonus downloads</p>
          <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>

      <div className={`mt-6 grid gap-4 ${compact ? "md:grid-cols-2" : "xl:grid-cols-2"}`}>
        {bonusDownloads.map((bonus) => (
          <a
            key={bonus.id}
            href={bonus.publicUrl}
            download
            className="rounded-[1.5rem] border border-[var(--border)] bg-white/5 px-5 py-5 hover:border-[var(--accent)] hover:bg-white/8"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
              Bonus guide
            </p>
            <h3 className="font-display mt-3 text-2xl leading-tight text-white">
              {bonus.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {bonus.description}
            </p>
            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                PDF download
              </span>
              <span className="brand-button-secondary px-4 py-2 text-[0.68rem]">
                Download PDF
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}