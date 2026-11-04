import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';
import { getPortfolioUrl } from '../utils/portfolioUrl';

export default function Navbar() {
  const { profile, logout } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();
  const isPublic = profile.isPublic !== false;

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm tracking-tight transition group-hover:scale-105">
            L
          </div>
          <span className="font-bold text-zinc-900 text-lg tracking-tight">
            linkme<span className="text-zinc-400">.</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isActive('/') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
          >
            Home
          </Link>

          <Link
            to="/settings"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${isActive('/settings') ? 'bg-zinc-100 text-zinc-900' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
              }`}
          >
            Settings
          </Link>

          <a
            href={getPortfolioUrl(profile.username)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-700 bg-zinc-50 border border-zinc-200/80 hover:bg-zinc-100 transition"
          >
            <span>My Portfolio</span>
            <ExternalLink size={14} className="text-zinc-400" />
          </a>

          {profile.isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5">
                <span
                  aria-label={isPublic ? 'Active' : 'Inactive'}
                  title={isPublic ? 'Portfolio is public' : 'Portfolio is private'}
                  className={`h-2 w-2 rounded-full ring-2 ${isPublic ? 'bg-emerald-500 ring-emerald-100' : 'bg-red-400 ring-zinc-100'}`}
                />
                <span className="max-w-28 sm:max-w-40 truncate text-xs font-semibold text-zinc-800">
                  {profile.name || profile.username || 'Account'}
                </span>
                {profile.username && <span className="hidden md:inline max-w-28 truncate text-xs text-zinc-500">@{profile.username}</span>}
              </div>
              <button
                type="button"
                onClick={() => { logout(); navigate('/login', { replace: true }); }}
                className="rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-2 py-1.5 text-sm text-zinc-600 hover:text-zinc-900">Sign in</Link>
              <Link to="/register" className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800">Create account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
