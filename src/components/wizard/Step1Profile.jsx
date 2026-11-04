import { Upload, Sparkles } from 'lucide-react';
import { uploadImage } from '../../services/userServices.js';
import { getPortfolioHost } from '../../utils/portfolioUrl';

const BIO_TEMPLATES = [
  'Designing minimalist interfaces and crafting open-source digital tools. Exploring AI and typography.',
  'Full-stack engineer passionate about clean code, cloud architecture, and building fast web products.',
  'Digital creator sharing weekly stories on technology, productivity, and modern lifestyle.',
  'Founder & indie hacker building micro-SaaS projects in public. Lover of coffee and minimalism.',
];

export default function Step1Profile({ profile, updateProfile }) {
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Please select an image under 5MB.');
      return;
    }
    try {
      const { url } = await uploadImage(file);
      updateProfile({ avatar: url });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-zinc-900 tracking-tight">1. Profile</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Handle, photo, name, and bio.</p>
      </div>

      <div className="bg-zinc-50/70 border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
        <div>
          <label className="block text-xs font-bold text-zinc-800 mb-1">Choose Your Public URL Handle</label>
          <div className="flex min-w-0 items-center rounded-xl border border-zinc-200 focus-within:border-zinc-900 bg-white px-3 py-2.5 text-sm shadow-2xs transition">
            <span className="text-zinc-400 font-mono select-none truncate max-w-[50%] shrink-0">{getPortfolioHost()}/</span>
            <input
              type="text"
              value={profile.username || ''}
              onChange={(e) => updateProfile({ username: e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '') })}
              placeholder="yourname"
              className="min-w-0 w-full pl-0.5 font-bold text-zinc-900 focus:outline-none bg-transparent"
            />
          </div>
          <p className="text-[11px] text-zinc-500 mt-1 break-all">
            Visitors open <span className="font-mono font-medium text-zinc-800">{getPortfolioHost()}/{profile.username || 'username'}</span>
          </p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <label className="block text-xs font-bold text-zinc-800">Profile Photo / Avatar</label>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative group shrink-0">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name || 'Avatar'} className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 shadow-xs" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-zinc-900 text-white font-bold text-2xl flex items-center justify-center shadow-xs">
                {profile.name?.charAt(0) || 'U'}
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-2xs transition cursor-pointer">
                <input type="file" onChange={handleFileUpload} accept="image/*" className="sr-only" />
                <Upload size={14} />
                <span>Upload From Device</span>
              </label>

              {profile.avatar && (
                <button
                  type="button"
                  onClick={() => updateProfile({ avatar: '' })}
                  className="px-3 py-2 rounded-xl border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-red-600 hover:border-red-200 transition cursor-pointer"
                >
                  Remove Photo
                </button>
              )}
            </div>

            <input
              type="url"
              value={profile.avatar || ''}
              onChange={(e) => updateProfile({ avatar: e.target.value })}
              placeholder="Or paste image URL (https://...)"
              className="w-full px-3 py-1.5 text-xs rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition bg-zinc-50"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1.5">Full Display Name</label>
            <input
              type="text"
              value={profile.name || ''}
              onChange={(e) => updateProfile({ name: e.target.value })}
              placeholder="Your name"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1.5">Professional Title / Tagline</label>
            <input
              type="text"
              value={profile.title || ''}
              onChange={(e) => updateProfile({ title: e.target.value })}
              placeholder="Your title"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-zinc-800">Short Bio / Introduction</label>
            <span className="text-[11px] text-zinc-400">{profile.bio?.length || 0} / 250 characters</span>
          </div>
          <textarea
            rows="3"
            maxLength={250}
            value={profile.bio || ''}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            placeholder="Tell your audience about who you are, what you make, and what drives you..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-zinc-900 transition resize-none"
          />

          <div className="mt-2.5">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-[11px] font-semibold text-zinc-500">Click for bio inspiration:</span>
            </div>
            <div className="space-y-1.5">
              {BIO_TEMPLATES.map((tmpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => updateProfile({ bio: tmpl })}
                  className="block w-full text-left p-2 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 text-[11px] text-zinc-600 hover:text-zinc-900 transition cursor-pointer"
                >
                  "{tmpl}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
