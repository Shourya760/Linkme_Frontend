import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProfile } from '../context/useProfile.js';
import { registerUser } from '../services/userServices.js';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useProfile();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const result = await registerUser({ name: name.trim(), username: username.trim().toLowerCase(), email: email.trim().toLowerCase(), password });
      if (!result?.token) throw new Error(result?.message || 'The server did not return a registration token.');
      localStorage.setItem('linkme_token', result.token);
      register(result.user, result.profile);
      navigate('/', { replace: true });
    } catch (requestError) {
      localStorage.removeItem('linkme_token');
      setError(requestError.response?.data?.message || requestError.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="min-h-dvh bg-zinc-50 flex items-center justify-center p-4 py-8">
      <section
        className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 sm:p-9 shadow-sm">
        <Link
          to="/"
          className="font-bold text-xl text-zinc-900">linkme.</Link>
        <h1
          className="mt-7 text-2xl font-bold text-zinc-900">Create your account</h1>
        <p
          className="mt-1 text-sm text-zinc-500">Set up your public portfolio profile.</p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4">
          <label
            className="block text-sm font-medium text-zinc-700">Name
            <input
              required
              maxLength={80}
              value={name}
              placeholder="Enter your full name ..."
              onChange={(event) => setName(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 font-normal focus:outline-none focus:border-zinc-900" />
          </label>
          <label
            className="block text-sm font-medium text-zinc-700">Username
            <input
              required
              minLength={3}
              maxLength={30}
              pattern="[a-zA-Z0-9_-]+"
              autoComplete="username"
              placeholder="Enter the username you want ..."
              value={username}
              onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 font-normal focus:outline-none focus:border-zinc-900" />
          </label>
          <label
            className="block text-sm font-medium text-zinc-700">Email
            <input
              required
              type="email"
              autoComplete="email"
              placeholder="Enter your Email..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 font-normal focus:outline-none focus:border-zinc-900" />
          </label>
          <label className="block text-sm font-medium text-zinc-700">
            Password

            <div className="relative mt-1.5">
              <input
                required
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                placeholder="Enter your password..."
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 pr-16 font-normal transition focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-500 hover:text-zinc-900 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          {error && <p
            role="alert"
            className="text-sm text-red-600">{error}</p>}
          <button
            disabled={loading}
            className="w-full rounded-xl bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60">
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p
          className="mt-5 text-center text-sm text-zinc-500">Already registered? <Link className="font-semibold text-zinc-900" to="/login">Sign in</Link></p>
      </section>
    </main>
  );
}
