import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { registerUser as registerAccount } from '../services/userServices.js';
import { getPortfolioHost } from '../utils/portfolioUrl';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useProfile();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await registerAccount({ name, username, email, password });
      localStorage.setItem('linkme_token', result.token);
      register(name, username.toLowerCase(), email, result.profile);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base tracking-tight transition group-hover:scale-105">
            L
          </div>
          <span className="font-bold text-zinc-900 text-xl tracking-tight">
            linkme<span className="text-zinc-400">.</span>
          </span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Claim your portfolio link</h1>
        <p className="mt-1.5 text-xs text-zinc-500">Create a minimalist bio portfolio to share on Instagram, X, and YouTube</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-8 sm:p-8 border border-zinc-200/90 rounded-2xl shadow-xs space-y-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Desired Username</label>
              <div className="flex items-center rounded-xl border border-zinc-200 focus-within:border-zinc-900 px-3.5 py-2.5 text-sm">
                <span className="text-zinc-400 select-none">{getPortfolioHost()}/</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                  placeholder="yourname"
                  className="w-full pl-0.5 focus:outline-none bg-transparent font-medium text-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-zinc-800 active:scale-[0.99] transition shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Creating Account...' : 'Create My Link'}
            </button>
          </form>

          {error && <p role="alert" className="text-xs text-red-600">{error}</p>}

          <p className="text-center text-xs text-zinc-500 pt-2">
            Already have a link?{' '}
            <Link to="/login" className="font-semibold text-zinc-900 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
