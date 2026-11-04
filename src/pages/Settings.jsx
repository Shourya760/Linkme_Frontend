import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, LogOut } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';
import Navbar from '../components/Navbar';
import { getPortfolioHost } from '../utils/portfolioUrl';
import { updateMyProfile } from '../services/profileServices.js';

export default function Settings() {
  const { profile, updateProfile, resetToDefault, logout } = useProfile();
  const navigate = useNavigate();
  const [username, setUsername] = useState(profile.username || '');
  const [email, setEmail] = useState(profile.email || '');
  const [isPublic, setIsPublic] = useState(profile.isPublic ?? true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsPublic(profile.isPublic !== false);
  }, [profile.isPublic]);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    const changes = {
      username: username.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      email: email.trim().toLowerCase(),
      isPublic,
    };
    try {
      const { profile: savedProfile } = await updateMyProfile(changes);
      updateProfile(savedProfile);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2000);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Could not save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Clear your profile content? Your name and username will stay.')) resetToDefault();
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Settings</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage your account and public profile.</p>
        </div>

        <form onSubmit={handleSave} className="bg-white border border-zinc-200/90 rounded-2xl p-6 space-y-5">
          <div>
            <label htmlFor="username" className="block text-xs font-medium text-zinc-700 mb-1.5">Portfolio handle</label>
            <div className="flex items-center rounded-xl border border-zinc-200 px-3.5 py-2 text-sm">
              <span className="text-zinc-400">{getPortfolioHost()}/</span>
              <input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full pl-1 focus:outline-none"
                autoComplete="off"
              />
            </div>
          </div>

          <label className="block text-xs font-medium text-zinc-700">Account email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-sm font-normal focus:outline-none focus:border-zinc-900" />
          </label>

          <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
            <div>
              <p className="text-xs font-medium">Public visibility</p>
              <p className="text-[11px] text-zinc-400">Allow visitors to view your public portfolio.</p>
            </div>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(event) => {
                const nextVisibility = event.target.checked;
                setIsPublic(nextVisibility);
                updateProfile({ isPublic: nextVisibility });
              }}
            />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" disabled={saving} className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-zinc-800 disabled:opacity-60">
              {saved ? <span className="inline-flex items-center gap-1"><Check size={14} /> Saved</span> : saving ? 'Saving…' : 'Save Settings'}
            </button>
            <button type="button" onClick={handleReset} className="px-4 py-2 rounded-xl text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50">
              Clear profile content
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </form>
        <section className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Sign out</h2>
            <p className="mt-1 text-xs text-zinc-500">Sign out of your LinkMe account on this device.</p>
          </div>
          <button
            type="button"
            onClick={() => { logout(); navigate('/login', { replace: true }); }}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-zinc-400 hover:bg-zinc-100 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
          >
            <LogOut size={15} />
            Sign out
          </button>
        </section>
      </main>
    </div>
  );
}
