import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import Navbar from '../components/Navbar';
import { updateMyProfile } from '../services/profileServices.js';
import { getPortfolioHost } from '../utils/portfolioUrl';

function SettingsForm({ profile, onProfileUpdate }) {
  const [email, setEmail] = useState(profile.email || '');
  const [username, setUsername] = useState(profile.username || '');
  const [isPublic, setIsPublic] = useState(profile.isPublic ?? true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    const changes = { email, username: username.toLowerCase().replace(/[^a-z0-9_-]/g, ''), isPublic };
    try {
      const { profile: savedProfile } = await updateMyProfile(changes);
      onProfileUpdate(savedProfile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="bg-white border border-zinc-200/90 rounded-2xl p-6 space-y-5">
      <h2 className="text-sm font-bold text-zinc-900">Profile & URL</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-700 mb-1.5">Your Public Portfolio Link</label>
          <div className="flex items-center rounded-xl border border-zinc-200 focus-within:border-zinc-900 px-3.5 py-2 text-sm bg-zinc-50">
            <span className="text-zinc-400 select-none">{getPortfolioHost()}/</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-0.5 focus:outline-none bg-transparent font-medium text-zinc-900"
            />
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">Changing your handle updates your public shareable link.</p>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 mb-1.5">Account Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
          />
        </div>

        <div className="flex items-center justify-between py-2 border-t border-zinc-100">
          <div>
            <p className="text-xs font-medium text-zinc-900">Public Visibility</p>
            <p className="text-[11px] text-zinc-400">Allow visitors to access your link in their browser</p>
          </div>
          <button
            type="button"
            onClick={() => setIsPublic(!isPublic)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPublic ? 'bg-zinc-900' : 'bg-zinc-200'
              }`}
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${isPublic ? 'translate-x-4' : 'translate-x-0'
                }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-zinc-800 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {saved ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span>Saved Changes</span>
              </>
            ) : (
              <span>{saving ? 'Saving…' : 'Save Settings'}</span>
            )}
          </button>

          {saved && <span className="text-xs text-emerald-600 font-medium">Updated successfully!</span>}
        </div>
      </form>
      {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
    </section>
  );
}

export default function Settings() {
  const { profile, updateProfile, resetToDefault, logout } = useProfile();
  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Clear your profile content? Your username and email will stay.')) {
      resetToDefault();
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">Account Settings</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage your linkme URL, account preferences, and public visibility</p>
        </div>

        <SettingsForm
          key={`${profile.username}-${profile.email}`}
          profile={profile}
          onProfileUpdate={updateProfile}
        />

        <section className="bg-white border border-red-100 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-red-600">Account Management</h2>
          <p className="text-xs text-zinc-500">Clear profile content while keeping your account details.</p>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 border border-zinc-200 hover:bg-zinc-50 transition cursor-pointer"
            >
              Clear Profile Content
            </button>
            <button
              onClick={handleSignOut}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 transition cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
