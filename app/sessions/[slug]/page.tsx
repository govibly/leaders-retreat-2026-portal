import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";

import { signOut } from "@/app/auth/actions";
import { BonusDownloads } from "@/components/bonus-downloads";
import { DonationPanel } from "@/components/donation-panel";
import { ProtectedAudioPlayer } from "@/components/protected-audio-player";
import { SessionPlayShortcut } from "@/components/session-play-shortcut";
import { getPublishedSessions, getSessionBySlug } from "@/lib/session-data";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type SessionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return getPublishedSessions().map((session) => ({ slug: session.slug }));
}

export async function generateMetadata({
  params,
}: SessionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const session = getSessionBySlug(slug);

  if (!session) {
    return {
      title: "Session Not Found | Leader's Retreat 2026",
    };
  }

  return {
    title: session.pageTitle,
    description: session.teaser,
  };
}

export default async function SessionPage({ params }: SessionPageProps) {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }
  }

  const { slug } = await params;
  const session = getSessionBySlug(slug);

  if (!session) {
    notFound();
  }

  const relatedSessions = getPublishedSessions()
    .filter((item) => item.slug !== session.slug)
    .slice(0, 3);
  const sessionAccessId = `session-access-${session.id}`;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[92rem] flex-col px-5 py-6 sm:px-8 lg:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="brand-lockup">
          <span className="brand-logo-frame">
            <Image
              src="/brand/logo.png"
              alt="ANFGC Leader's Retreat"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-contain"
              priority
            />
          </span>
          <div>
            <p className="editorial-label">ANFGC Leader&apos;s Retreat 2026</p>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Session archive
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="#donate-now" className="brand-button-secondary">
            Donate
          </Link>
          <Link href="/" className="brand-button-ghost">
            Back to all sessions
          </Link>
          <form action={signOut}>
            <button className="brand-button-ghost" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>

      <section className="poster-glow surface-panel-strong overflow-hidden rounded-[2.2rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
        <div className="grid gap-8 xl:grid-cols-[1.12fr_0.88fr] xl:items-start">
          <div>
            <p className="editorial-label">
              {session.eventDay}
            </p>
            <h1 className="font-display mt-4 max-w-4xl text-[3.1rem] leading-[0.9] tracking-[-0.045em] text-white sm:text-[4.3rem] lg:text-[5.1rem]">
              {session.title}
            </h1>
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-[var(--muted-strong)]">
              Session {String(session.sortOrder).padStart(2, "0")} • {session.speaker}
            </p>
            <div className="mt-6 md:hidden">
              <SessionPlayShortcut
                targetId={sessionAccessId}
                className="brand-button-primary w-full"
              />
            </div>
            <p className="mt-8 max-w-3xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
              {session.coverCopy}
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                { label: "Session code", value: session.sessionCode },
                { label: "Resources", value: `${session.downloads.length} included` },
                {
                  label: "Bonus guides",
                  value: "4 available",
                  href: "#bonus-guides",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`surface-panel-soft rounded-[1.4rem] p-4 ${item.href ? "hover:border-[var(--accent)] hover:bg-white/8" : ""}`}
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                    {item.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <aside id={sessionAccessId} className="surface-panel rounded-[2rem] p-5 sm:p-6">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                Session access
              </p>
              <p className="font-display mt-4 text-4xl text-white">
                Stream and study in one view
              </p>
            </div>
            <div className="rounded-[1.7rem] border border-white/10 bg-black/30 p-4">
              <ProtectedAudioPlayer src={session.audioPublicUrl} className="mt-2 w-full" />
            </div>
            <div className="grid gap-3 pt-2">
              {session.downloads.map((download) => (
                <a
                  key={`${session.id}-${download.id}`}
                  href={download.publicUrl}
                  download
                  className="rounded-[1.4rem] border border-[var(--border)] bg-white/5 px-4 py-4 hover:border-[var(--accent)] hover:bg-white/8"
                >
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                    {download.kind === "general-introduction"
                      ? "Shared resource"
                      : "Session resource"}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-strong)]">
                    {download.label}
                  </p>
                  <p className="mt-2 text-sm text-[#ece5d9]">{download.fileName}</p>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
          <p className="editorial-label">
            Listening notes
          </p>
          <h2 className="font-display mt-4 text-4xl text-white sm:text-5xl">
            A session page built for continuity
          </h2>
          <p className="mt-6 text-base leading-8 text-[var(--muted)]">
            This page keeps the audio, the general introduction, and the
            companion booklet together so members can listen and follow along
            without switching contexts. Everything needed for reflection stays
            gathered in one place, so the flow of the retreat is easy to revisit.
          </p>
        </div>

        <div className="surface-panel rounded-[1.9rem] p-6 sm:p-8">
          <p className="editorial-label">
            Continue the retreat
          </p>
          <div className="mt-5 grid gap-4">
            {relatedSessions.map((item) => (
              <Link
                key={item.id}
                href={`/sessions/${item.slug}`}
                className="rounded-[1.5rem] border border-[var(--border)] px-4 py-4 hover:border-[var(--accent)] hover:bg-white/5"
              >
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                  {item.eventDay}
                </p>
                <p className="font-display mt-2 text-2xl text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                  {item.teaser}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8">
        <BonusDownloads
          anchorId="bonus-guides"
          title="Bonus guides available with every session"
          description="These bonus PDF resources are available throughout the retreat library for deeper study, review, and follow-up conversations."
        />
      </div>

      <div className="mt-8">
        <DonationPanel
          anchorId="donate-now"
          title="Give a donation online"
          description="If these teachings and resources have been a blessing to you, you can give securely online to support the ministry, content, and retreat resources."
        />
      </div>
    </main>
  );
}