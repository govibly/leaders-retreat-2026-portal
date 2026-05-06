import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signIn, signUp } from "@/app/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type LoginPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { message } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-10 sm:px-10">
        <section className="surface-panel-strong w-full rounded-[2rem] p-8 sm:p-10">
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
            <p className="editorial-label">ANFGC Leader&apos;s Retreat 2026</p>
          </div>
          <h1 className="font-display mt-4 max-w-[11ch] text-[3rem] leading-[0.9] tracking-[-0.045em] text-white sm:max-w-[12ch] sm:text-[4.25rem]">
            Member access is not available yet
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-strong)]">
            This private library is still being prepared. Please return shortly
            to sign in and access the retreat archive.
          </p>
          <Link
            href="/"
            className="brand-button-secondary mt-8"
          >
            Back to portal
          </Link>
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[92rem] items-center px-5 py-6 sm:px-8 lg:px-10">
      <section className="grid w-full gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="poster-glow surface-panel-strong relative overflow-hidden rounded-[2.2rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),transparent_32%,rgba(207,177,122,0.08))]" />
          <div className="relative">
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
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
                  Exclusive member access
                </p>
              </div>
            </div>
            <h1 className="font-display mt-5 max-w-[10.5ch] text-[3.1rem] leading-[0.89] tracking-[-0.05em] text-white sm:max-w-[11.5ch] sm:text-[4.4rem] lg:max-w-[12.5ch] lg:text-[5.15rem]">
              Step back into the retreat and relive the full experience.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted-strong)] sm:text-lg">
              Sign in to continue listening, or create an account to open the
              full session library and receive every companion resource in one place.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row xl:hidden">
              <a className="brand-button-primary w-full sm:w-auto" href="#sign-in">
                Sign in
              </a>
              <a className="brand-button-secondary w-full sm:w-auto" href="#create-account">
                Create account
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                "11 audio sessions",
                "Session resources attached",
                "Additional bonus materials",
              ].map((item) => (
                <div
                  key={item}
                  className="surface-panel-soft rounded-[1.5rem] px-4 py-4 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="speaker-monogram rounded-[1.9rem] border border-white/10 p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[var(--muted-strong)]">
                  Featured speaker
                </p>
                <p className="font-display mt-4 text-4xl leading-none text-white sm:text-5xl">
                  Dr. Samuel Donkor
                </p>
                <div className="font-display mt-10 text-[5.5rem] leading-none text-white/12 sm:text-[7rem]">
                  SD
                </div>
              </div>
              <div className="grid gap-4">
                <div className="surface-panel-soft rounded-[1.6rem] p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Immerse yourself
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    Revisit each message in the same sequence it was preached.
                  </p>
                </div>
                <div className="surface-panel-soft rounded-[1.6rem] p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--muted)]">
                    Companion material
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted-strong)]">
                    Keep the introduction and study downloads close to every session.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 xl:pl-4">
          {message ? (
            <div className="surface-panel rounded-[1.5rem] border border-[var(--accent)] px-5 py-4 text-sm leading-7 text-[#f5e3c1]">
              {message}
            </div>
          ) : null}

          <section id="sign-in" className="surface-panel scroll-mt-6 rounded-[1.9rem] p-6 sm:p-8">
            <p className="editorial-label">
              Sign in
            </p>
            <form action={signIn} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Email
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Password
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  required
                />
              </label>
              <button
                className="brand-button-primary mt-2"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>

          <section id="create-account" className="surface-panel scroll-mt-6 rounded-[1.9rem] p-6 sm:p-8">
            <p className="editorial-label">
              Create account
            </p>
            <form action={signUp} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Full name
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="fullName"
                  type="text"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Church branch
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="churchBranch"
                  type="text"
                  placeholder="Example: Ajax"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Email
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label className="grid gap-2 text-sm text-[var(--muted)]">
                Password
                <input
                  className="rounded-2xl border border-[var(--border)] bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[var(--accent)]"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  minLength={6}
                  required
                />
              </label>
              <button
                className="brand-button-secondary mt-2"
                type="submit"
              >
                Create account
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}