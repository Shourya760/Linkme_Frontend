import { useState } from 'react';
import { Check } from 'lucide-react';
import { useProfile } from '../context/useProfile.js';
import Navbar from '../components/Navbar';
import { getPortfolioHost } from '../utils/portfolioUrl';

export default function Settings() {
  const { profile, updateProfile, resetToDefault } = useProfile();
  const [username, setUsername] = useState(profile.username || '');
  const [isPublic, setIsPublic] = useState(profile.isPublic ?? true);
  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    updateProfile({
      username: username.toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      isPublic,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
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
          <p className="text-xs text-zinc-500 mt-1">Your profile is saved in this browser.</p>
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

          <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
            <div>
              <p className="text-xs font-medium">Public visibility</p>
              <p className="text-[11px] text-zinc-400">Controls the visibility badge in your preview.</p>
            </div>
            <input type="checkbox" checked={isPublic} onChange={(event) => setIsPublic(event.target.checked)} />
          </div>

          <div className="flex items-center gap-3">
            <button type="submit" className="bg-zinc-900 text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-zinc-800">
              {saved ? <span className="inline-flex items-center gap-1"><Check size={14} /> Saved</span> : 'Save Settings'}
            </button>
            <button type="button" onClick={handleReset} className="px-4 py-2 rounded-xl text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50">
              Clear profile content
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
