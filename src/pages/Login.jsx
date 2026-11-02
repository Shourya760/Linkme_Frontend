import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';
import { loginUser as loginAccount } from '../Services/userServices';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useProfile();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await loginAccount({ email, password });
      if (!result?.token || !result?.user?.email) {
        throw new Error(result?.message || 'The server returned an incomplete login response.');
      }
      localStorage.setItem('linkme_token', result.token);
      login(result.user.email);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to sign in. Please try again.');
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
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Welcome back</h1>
        <p className="mt-1.5 text-xs text-zinc-500">Enter your details to manage your personal portfolio link</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-6 py-8 sm:p-8 border border-zinc-200/90 rounded-2xl shadow-xs space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-zinc-700">Password</label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-xs text-zinc-400 hover:text-zinc-800 transition">
                  Forgot?
                </a>
              </div>
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
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {error && <p role="alert" className="text-xs text-red-600">{error}</p>}

          <p className="text-center text-xs text-zinc-500 pt-2">
            Don't have a link yet?{' '}
            <Link to="/register" className="font-semibold text-zinc-900 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
