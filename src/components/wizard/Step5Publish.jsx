import { useState } from 'react';
import { Check, Copy, ExternalLink, QrCode, Sparkles } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { THEMES } from '../../utils/storage';
import { getPortfolioUrl, getPortfolioHost } from '../../utils/portfolioUrl';


export default function Step5Publish({ profile }) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const shareUrl = getPortfolioUrl(profile.username);
  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const theme = THEMES.find((t) => t.id === profile?.theme?.id) || THEMES[0];
  const activeSocialCount = Object.values(profile.socials || {}).filter((v) => Boolean(v?.trim())).length;
  const customLinksCount = profile.customLinks?.length || 0;
  const photosCount = profile.photos?.length || 0;

  const shareText = `Check out my personal link in bio portfolio: ${shareUrl}`;

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-semibold mb-2">
          <Sparkles size={13} />
          <span>Your Portfolio is Configured & Ready!</span>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 tracking-tight">5. Review & Share Your Portfolio Link</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Everything has been structured and synced. Grab your shareable link, download your personal QR code, or open the live view.</p>
      </div>

      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full animate-pulse ${profile.isPublic ? 'bg-emerald-400' : 'bg-red-400'}`} />
            {profile.isPublic ? 'Public profile' : 'Private profile'}
          </span>
          <span className="text-xs font-semibold bg-white/10 px-2.5 py-0.5 rounded-full text-zinc-200">
            {theme.name}
          </span>
        </div>

        <div>
          <p className="text-xs text-zinc-400 mb-1">Your Unique Portfolio URL</p>
          <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-1 flex-wrap">
            <span>{getPortfolioHost()}/</span>
            <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4">
              {profile.username || 'Choose a username'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-white text-zinc-900 px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-zinc-100 transition active:scale-95 shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Shareable Link</span>
              </>
            )}
          </button>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition"
          >
            <span>Open Live Portfolio</span>
            <ExternalLink size={14} className="text-zinc-400" />
          </a>

          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="flex items-center justify-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3.5 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer"
            title="Generate QR code"
          >
            <QrCode size={15} />
            <span className="hidden sm:inline">QR Code</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Configuration Summary</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <p className="text-xs text-zinc-500">Profile Name</p>
            <p className="text-sm font-bold text-zinc-900 truncate mt-0.5">{profile.name || 'Not set'}</p>
            <p className="text-[10px] text-zinc-400 truncate">@{profile.username}</p>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <p className="text-xs text-zinc-500">Connected Links</p>
            <p className="text-sm font-bold text-zinc-900 mt-0.5">{activeSocialCount + customLinksCount} Total</p>
            <p className="text-[10px] text-zinc-400">{activeSocialCount} Social + {customLinksCount} Custom</p>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <p className="text-xs text-zinc-500">Design Theme</p>
            <p className="text-sm font-bold text-zinc-900 mt-0.5">{theme.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: profile.theme?.accentColor || theme.accentColor }} />
              <span className="text-[10px] font-mono text-zinc-400">{profile.theme?.accentColor || theme.accentColor}</span>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <p className="text-xs text-zinc-500">Showcase Photos</p>
            <p className="text-sm font-bold text-zinc-900 mt-0.5">{photosCount} Photos</p>
            <p className="text-[10px] text-zinc-400">{profile.interests?.length || 0} Skills Tags</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-2xs">
        <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 block">Share to Social Media Directly</label>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition"
          >
            <FaXTwitter size={14} />
            <span>Post on X</span>
          </a>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition"
          >
            <FaWhatsapp size={14} className="text-emerald-600" />
            <span>Share to WhatsApp</span>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition"
          >
            <FaLinkedin size={14} className="text-blue-600" />
            <span>Share to LinkedIn</span>
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-xs font-semibold text-zinc-800 transition"
          >
            <FaInstagram size={14} className="text-orange-600" />
            <span>Share to Instagram</span>
          </a>
        </div>
      </div>

      <QrModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} username={profile.username} title="Your Personal QR Code" />
    </div>
  );
}
