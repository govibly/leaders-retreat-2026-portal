import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/auth/actions";
import { BonusDownloads } from "@/components/bonus-downloads";
import { getPublishedSessions } from "@/lib/session-data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
  }

  const sessions = getPublishedSessions();
  const leadSession = sessions[0];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[92rem] flex-col px-5 py-6 sm:px-8 lg:px-10">
      <section className="poster-glow surface-panel-strong relative overflow-hidden rounded-[2.2rem] px-6 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.05),transparent_32%,rgba(207,177,122,0.08)_70%,transparent)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div className="brand-lockup">
                <span className="brand-logo-frame">
                  <Image
                    src="/brand/logo.png"
                    alt="ANFGC Leader's Retreat"
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-contain"
                    priority
                  />
                </span>
                <div>
                  <p className="editorial-label">ANFGC Leader&apos;s Retreat 2026</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.26em] text-[var(--muted)]">
                    Private audio library
                  </p>
                </div>
              </div>
              <form action={signOut}>
                <button className="brand-button-ghost" type="submit">
                  Sign out
                </button>
              </form>
            </div>
            <div className="editorial-rule mt-5 max-w-44" />
            <h1 className="font-display mt-7 max-w-5xl text-[3.4rem] leading-[0.92] text-white sm:text-[4.6rem] lg:text-[5.9rem] xl:text-[6.6rem]">
              The Year of the Holy Spirit.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
              Stream the full retreat archive, revisit each message in order,
              and keep every companion resource close at hand.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="brand-button-primary" href="#sessions">
                Explore Sessions
              </a>
              <Link
                className="brand-button-secondary"
                href={leadSession ? `/sessions/${leadSession.slug}` : "#sessions"}
              >
                Start With Session 1
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                {
                  label: "Library",
                  value: "11 sessions",
                  detail: "Every message available on mobile and desktop.",
                },
                {
                  label: "Resources",
                  value: "4 bonus guides",
                  detail: "Fresh bonus PDFs are available across the retreat library.",
                },
                {
                  label: "Session downloads",
                  value: "2 per session",
                  detail: "Each message includes its paired introduction and booklet.",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="surface-panel-soft rounded-[1.5rem] p-5"
                >
                  <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-xl font-semibold text-white">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {stat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] xl:min-h-[44rem]">
            <div className="speaker-monogram surface-panel relative flex min-h-[25rem] flex-col justify-between rounded-[2rem] p-6 sm:p-7">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[var(--muted-strong)]">
                  Featured reflection
                </p>
                <p className="font-display mt-5 max-w-md text-4xl leading-[1.02] text-white sm:text-5xl">
                  Our emotions may shift, but the Word of God remains steady.
                </p>
              </div>
              <div className="relative mt-8">
                <div className="font-display text-[5rem] leading-none text-white/10 sm:text-[7rem]">
                  2026
                </div>
                <p className="absolute bottom-4 left-0 max-w-sm text-sm uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  A retreat archive centered on the Person, presence, and work of the Holy Spirit.
                </p>
              </div>
            </div>
            <div className="speaker-monogram surface-panel relative flex min-h-[25rem] flex-col justify-between rounded-[2rem] p-6 sm:p-7">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.32em] text-[var(--muted-strong)]">
                  {/* Featured speaker */}
                </p>
                <p className="font-display mt-4 max-w-sm text-5xl leading-none text-white sm:text-6xl">
                  Dr. Samuel Donkor
                </p>
              </div>
              <div className="relative mt-8">
                <div className="font-display text-[7rem] leading-none text-white/10 sm:text-[9rem]">
                  SD
                </div>
                <p className="absolute bottom-4 left-0 max-w-xs text-sm uppercase tracking-[0.24em] text-[var(--muted-strong)]">
                  Listen again. Study deeply. Continue the retreat with intention.
                </p>
              </div>
            </div>

            {/* <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {featuredSessions.map((session, index) => (
                <article
                  key={session.id}
                  className={`surface-panel-soft rounded-[1.7rem] p-5 ${index === 1 ? "lg:translate-x-5" : ""}`}
                >
                  <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    <span>{session.eventDay}</span>
                    <span>{session.sessionCode}</span>
                  </div>
                  <h2 className="font-display mt-4 text-3xl leading-tight text-white">
                    {session.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    {session.teaser}
                  </p>
                </article>
              ))}
              <div className="surface-panel-soft rounded-[1.7rem] p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                  Experience
                </p>
                <p className="font-display mt-4 text-3xl text-white">
                  Listen. Reflect. Download.
                </p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  A focused archive that keeps the message and its study material in one place.
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* <section className="mt-6 grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="editorial-label">Portal structure</p>
              <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl">
                Built for quiet focus, not file hunting.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--muted)]">
              Each session opens into a dedicated listening page with the full
              message introduction, embedded audio, and the exact resources for
              deeper study.
            </p>
          </div>
        </div>

        <div className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
          <p className="editorial-label">Access</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
            Secure sign-in protects the archive while keeping playback and downloads simple for members and invited guests.
          </p>
        </div>
      </section> */}

      <section id="sessions" className="mt-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="editorial-label">Session library</p>
            <h2 className="font-display mt-3 text-4xl text-white sm:text-5xl lg:text-6xl">
              Choose a session and enter the room.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Move through the sessions in the intended flow, with the message,
            supporting notes, and study downloads together in one place.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {sessions.map((session) => (
            <article
              key={session.id}
              className="session-card surface-panel group flex h-full flex-col rounded-[1.85rem] p-6 duration-200"
            >
              <div className="flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                <span>{session.eventDay}</span>
                <span>{session.sessionCode}</span>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_36%,rgba(207,177,122,0.14))] p-5">
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-display text-3xl leading-tight text-white sm:text-[2.2rem]">
                    {session.title}
                  </h3>
                  <span className="font-display text-5xl leading-none text-white/12">
                    {String(session.sortOrder).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.26em] text-[var(--muted-strong)]">
                  {session.speaker}
                </p>
              </div>
              <p className="mt-6 flex-1 text-sm leading-7 text-[var(--muted)]">
                {session.teaser}
              </p>
              <div className="mt-6 flex items-center justify-between text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                <span>{session.downloads.length} resources</span>
                <span>Audio ready</span>
              </div>
              <Link
                className="brand-button-secondary brand-button-block mt-5"
                href={`/sessions/${session.slug}`}
              >
                Open Session
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <BonusDownloads
          title="Bonus guides for listeners and members"
          description="Alongside each session, members can also download these four bonus PDF guides for personal review, follow-up study, and group reflection."
        />
      </div>
    </main>
  );
}