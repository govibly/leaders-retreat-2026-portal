import { createDonationCheckoutSession } from "@/app/donations/actions";

const suggestedAmounts = [25, 50, 100];

type DonationPanelProps = {
  title?: string;
  description?: string;
  anchorId?: string;
};

export function DonationPanel({
  title = "Support the retreat library",
  description =
    "Members can give securely online to help sustain the audio archive and future resource development.",
  anchorId,
}: DonationPanelProps) {
  return (
    <section id={anchorId} className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="editorial-label">Online giving</p>
          <h2 className="font-display mt-3 text-3xl text-white sm:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 sm:grid-cols-3">
          {suggestedAmounts.map((amount) => (
            <form key={amount} action={createDonationCheckoutSession}>
              <input type="hidden" name="amount" value={amount} />
              <button className="surface-panel-soft h-full min-h-32 w-full rounded-[1.5rem] p-5 text-left hover:border-[var(--accent)] hover:bg-white/8" type="submit">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  Suggested gift
                </p>
                <p className="font-display mt-4 text-4xl text-white">${amount}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Give a one-time donation securely through Checkout.
                </p>
              </button>
            </form>
          ))}
        </div>

        <form action={createDonationCheckoutSession} className="surface-panel-soft rounded-[1.5rem] p-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
            Custom amount
          </p>
          <label className="mt-4 grid gap-2 text-sm text-[var(--muted)]">
            Donation amount
            <input
              className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
              name="amount"
              type="number"
              min="5"
              step="1"
              placeholder="Enter amount"
              required
            />
          </label>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            Minimum donation is $5. The secure payment page will open after you submit.
          </p>
          <button className="brand-button-secondary mt-5 brand-button-block" type="submit">
            Continue to donation
          </button>
        </form>
      </div>
    </section>
  );
}