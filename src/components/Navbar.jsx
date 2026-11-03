import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';
import { getPortfolioUrl } from '../utils/portfolioUrl';

export default function Navbar() {
  const { profile, logout } = useProfile();
  const location = useLocation();
  const navigate = useNavigate();

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
              {profile.username && <span className="hidden sm:block text-xs text-zinc-500">@{profile.username}</span>}
              <button type="button" onClick={async () => { await logout(); navigate('/login'); }} className="px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-900">Sign out</button>
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
