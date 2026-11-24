
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Image, Link2, Sparkles, UserRound } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';

const features = [
  { label: 'Profile', detail: 'Your photo, bio and interests', Icon: UserRound },
  { label: 'Links', detail: 'Your socials and favorite places', Icon: Link2 },
  { label: 'Showcase', detail: 'Projects, photos and highlights', Icon: Image },
];

export default function Landing() {
  const { profile } = useProfile();

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#fafafa] text-zinc-900">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-sm text-white">
              L
            </span>
            <span className="text-lg">
              linkme<span className="text-zinc-400">.</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {profile.isAuthenticated ? (
              <Link
                to="/builder"
                className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Open my builder
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Create for free
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex flex-1 items-center">
        <section className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-6 px-5 py-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Left content */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-600">
              <Sparkles size={14} />
              Your free page starts here
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.04] tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
              All of you.
              <br />
              <span className="text-zinc-500">One free link.</span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Bring your bio, socials, photos and best work together on one page.
              Create it for free, then share one simple link.
            </p>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/builder"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Create my free page
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>

              <span className="text-xs font-medium text-zinc-500">
                Free to make. Easy to share.
              </span>
            </div>

            {/* Features */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {features.map(({ label, detail, Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-zinc-700">
                    <Icon size={17} />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-zinc-900">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-[10px] leading-4 text-zinc-500">
                      {detail}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right preview */}
          <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto">
            <div className="relative rounded-[28px] border border-gray-200 bg-white p-3 shadow-xl shadow-black/[0.04]">
              <div className="rounded-[22px] border border-gray-100 bg-[#fafafa] p-5 sm:p-6">

                {/* Profile */}
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-950 text-xl font-bold text-white">
                    S
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-bold text-zinc-950">
                      Shourya Verma
                      <span className="text-zinc-400"> ✦</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      Designer · maker · curious human
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-zinc-600">
                  Making useful things for the internet. Currently collecting new ideas ☀️
                </p>

                {/* Socials */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-semibold text-zinc-700">
                    ig
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-semibold text-zinc-700">
                    X
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[11px] font-semibold text-zinc-700">
                    in
                  </span>
                  <span className="ml-1 text-xs font-medium text-zinc-500">
                    Find me around
                  </span>
                </div>

                {/* Links */}
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-300">
                    <span className="text-sm font-semibold text-zinc-800">
                      ✳ &nbsp;Selected work
                    </span>
                    <ExternalLink size={14} className="text-zinc-400" />
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition hover:border-gray-300">
                    <span className="text-sm font-semibold text-zinc-800">
                      ♡ &nbsp;My little project
                    </span>
                    <ExternalLink size={14} className="text-zinc-400" />
                  </div>
                </div>

                {/* Showcase */}
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  <div className="h-16 rounded-xl border border-gray-200 bg-gray-100" />
                  <div className="h-16 rounded-xl border border-gray-200 bg-gray-100" />
                  <div className="h-16 rounded-xl border border-gray-200 bg-gray-100" />
                </div>
              </div>

              {/* Preview Footer */}
              <div className="flex items-center justify-between px-3 pb-1 pt-3 text-[11px] font-medium text-zinc-400">
                <span>linkme-sandy.vercel.app/shourya</span>
                <span className="inline-flex items-center gap-1.5 text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Ready to share
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="font-bold tracking-tight text-zinc-800">
            linkme<span className="text-zinc-400">.</span>
          </Link>

          <p>Free to create. Made to share.</p>
          <p>© {new Date().getFullYear()} LinkMe</p>
        </div>
      </footer>
    </div>
  );
}
