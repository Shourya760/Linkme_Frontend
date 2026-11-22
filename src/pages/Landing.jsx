import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Image, Link2, Sparkles, UserRound } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';

const features = [
  { label: 'Profile', detail: 'Your photo, bio and interests', Icon: UserRound, color: 'bg-violet-100 text-violet-700' },
  { label: 'Links', detail: 'Your socials and favorite places', Icon: Link2, color: 'bg-sky-100 text-sky-700' },
  { label: 'Showcase', detail: 'Projects, photos and highlights', Icon: Image, color: 'bg-amber-100 text-amber-700' },
];

export default function Landing() {
  const { profile } = useProfile();

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#fcfbff] text-zinc-900">
      <header className="relative z-10 border-b border-violet-100/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-sm text-white">L</span>
            <span className="text-lg">linkme<span className="text-violet-500">.</span></span>
          </Link>
          <nav className="flex items-center gap-2">
            {profile.isAuthenticated ? (
              <Link to="/builder" className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700">Open my builder</Link>
            ) : (
              <>
                <Link to="/login" className="rounded-xl px-3 py-2 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950">Sign in</Link>
                <Link to="/register" className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-violet-700">Create for free</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="relative flex flex-1 items-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-28 top-8 h-96 w-96 rounded-full bg-fuchsia-200/40 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />
        </div>
        <section className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-violet-700 shadow-sm">
              <Sparkles size={14} /> Your free page starts here
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-zinc-950 sm:text-5xl lg:text-6xl">
              All of you.<br /><span className="text-violet-600">One free link.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Bring your bio, socials, photos and best work together on one page. Create it for free, then share one simple link.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link to="/builder" className="group inline-flex items-center gap-2.5 rounded-xl bg-zinc-950 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-950/15 transition hover:-translate-y-0.5 hover:bg-violet-700">
                Create my free page <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <span className="text-xs font-medium text-zinc-500">Free to make. Easy to share.</span>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {features.map(({ label, detail, Icon, color }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/90 bg-white/75 p-3 shadow-sm backdrop-blur">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${color}`}><Icon size={17} /></span>
                  <span className="min-w-0"><span className="block text-xs font-extrabold">{label}</span><span className="mt-0.5 block text-[10px] leading-4 text-zinc-500">{detail}</span></span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[390px] lg:ml-auto">
            <div aria-hidden="true" className="absolute -left-6 top-12 z-10 flex h-14 w-14 rotate-[-10deg] items-center justify-center rounded-2xl border-4 border-white bg-amber-200 text-amber-800 shadow-xl sm:-left-10"><Sparkles size={21} /></div>
            <div aria-hidden="true" className="absolute -right-3 bottom-16 z-10 h-12 w-12 rotate-[12deg] rounded-2xl border-4 border-white bg-violet-200 shadow-xl sm:-right-8" />
            <div className="relative rotate-[1deg] rounded-[30px] border border-white bg-white/90 p-3 shadow-[0_28px_90px_-30px_rgba(76,29,149,0.42)] backdrop-blur transition-transform duration-300 hover:rotate-0">
              <div className="rounded-[23px] bg-gradient-to-br from-violet-100 via-rose-50 to-amber-50 p-5 sm:p-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[19px] bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xl font-extrabold text-white shadow-lg">A</div>
                  <div className="min-w-0"><p className="truncate text-base font-extrabold">Alex Morgan <span className="text-violet-500">✦</span></p><p className="mt-0.5 truncate text-xs text-zinc-500">Designer · maker · curious human</p></div>
                </div>
                <p className="mt-4 text-sm leading-6 text-zinc-600">Making useful things for the internet. Currently collecting new ideas ☀️</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-pink-600 shadow-sm">ig</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-zinc-800 shadow-sm">X</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-blue-700 shadow-sm">in</span>
                  <span className="ml-1 text-xs font-medium text-zinc-500">Find me around</span>
                </div>
                <div className="mt-5 space-y-2.5">
                  <div className="flex items-center justify-between rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm"><span className="text-sm font-bold">✳ &nbsp;Selected work</span><ExternalLink size={14} className="text-zinc-400" /></div>
                  <div className="flex items-center justify-between rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-sm"><span className="text-sm font-bold">♡ &nbsp;My little project</span><ExternalLink size={14} className="text-zinc-400" /></div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2.5">
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-rose-200 to-orange-100" />
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-sky-200 to-violet-100" />
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-lime-200 to-amber-100" />
                </div>
              </div>
              <div className="flex items-center justify-between px-3 pb-1 pt-3 text-[11px] font-semibold text-zinc-400"><span>linkme.site/alexmorgan</span><span className="inline-flex items-center gap-1.5 text-emerald-600"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Your page, ready to share</span></div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -z-10 h-16 w-4/5 -translate-x-1/2 rounded-full bg-violet-400/25 blur-2xl" />
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-violet-100/80 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="font-extrabold tracking-tight text-zinc-800">linkme<span className="text-violet-500">.</span></Link>
          <p>Free to create. Made to share.</p>
          <p>© {new Date().getFullYear()} LinkMe</p>
        </div>
      </footer>
    </div>
  );
}
