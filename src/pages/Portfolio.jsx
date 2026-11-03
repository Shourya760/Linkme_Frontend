import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Copy, ExternalLink, ArrowLeft, Star, QrCode, Sparkles, UserX } from 'lucide-react';
import { FaShareNodes } from 'react-icons/fa6';
import { useProfile } from '../context/ProfileContext';
import { THEMES, BUTTON_STYLES, FONT_STYLES, PLATFORMS } from '../utils/storage';
import { getPublicProfile } from '../services/profileServices.js';
import { getPortfolioUrl, getPortfolioHost } from '../utils/portfolioUrl';
import { SOCIAL_ICONS, getSocialUrl, getCustomLinkIcon } from '../utils/socials';


export default function Portfolio() {
  const { username } = useParams();
  const { profile: localProfile, loading: localLoading } = useProfile();
  const [remoteProfile, setRemoteProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [publicProfileError, setPublicProfileError] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const isSelf = !username || (localProfile.username && username.toLowerCase() === localProfile.username.toLowerCase());
  const isOwner = Boolean(localProfile.isAuthenticated && isSelf);

  useEffect(() => {
    if (isSelf) return;

    let cancelled = false;
    setIsLoading(true);
    setPublicProfileError('');

    getPublicProfile(username)
      .then(({ profile: fetched }) => {
        if (!cancelled) {
          setRemoteProfile(fetched);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setPublicProfileError(error.response?.data?.message || 'Portfolio not found');
          setIsLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [username, isSelf]);

  const profile = (isSelf ? localProfile : remoteProfile) || localProfile;
  const portfolioHost = getPortfolioHost();
  const shareUrl = getPortfolioUrl(profile?.username || username);

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const theme = THEMES.find((t) => t.id === profile?.theme?.id) || THEMES[0];
  const btnStyle = BUTTON_STYLES.find((b) => b.id === profile?.theme?.buttonStyle) || BUTTON_STYLES[1];
  const fontStyle = FONT_STYLES.find((f) => f.id === profile?.theme?.fontStyle) || FONT_STYLES[0];
  const accentColor = profile?.theme?.accentColor || theme.accentColor;
  const activeSocials = PLATFORMS.filter((p) => profile?.socials?.[p.id]?.trim());

  const isPill = btnStyle.id === 'pill';
  const isSquare = btnStyle.id === 'square';
  const isOutline = btnStyle.id === 'outline';
  const linkShape = isPill ? 'rounded-full px-5' : isSquare ? 'rounded-lg' : isOutline ? 'rounded-2xl border-2' : 'rounded-2xl';

  if (isLoading || (!username && localLoading)) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-lg space-y-6 animate-pulse text-center">
          <div className="w-24 h-24 rounded-full bg-zinc-200 mx-auto" />
          <div className="space-y-2.5">
            <div className="h-6 w-40 bg-zinc-200 rounded-full mx-auto" />
            <div className="h-4 w-32 bg-zinc-100 rounded-full mx-auto" />
            <div className="h-3.5 w-56 bg-zinc-100 rounded-full mx-auto pt-1" />
          </div>
          <div className="flex justify-center gap-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-9 h-9 rounded-full bg-zinc-100" />
            ))}
          </div>
          <div className="space-y-3 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 bg-zinc-100 rounded-2xl w-full" />
            ))}
          </div>
        </div>
        <p className="text-xs text-zinc-400 mt-6 font-medium">Loading portfolio...</p>
      </div>
    );
  }

  if (publicProfileError || (!username && !localProfile.username && !localProfile.name)) {
    const isNotFound = Boolean(publicProfileError);
    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-5">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${isNotFound ? 'bg-zinc-100 text-zinc-600' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
            {isNotFound ? <UserX size={32} /> : <Sparkles size={30} />}
          </div>
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              {isNotFound ? 'Portfolio Not Found' : 'Build Your LinkMe Portfolio'}
            </h1>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {isNotFound ? (
                <>We couldn't find a portfolio for <span className="font-mono font-semibold text-zinc-800">@{username}</span>. This link might be private, inactive, or not registered yet.</>
              ) : (
                'No portfolio was specified. Create your free link in bio to showcase your work, socials, and links in minutes.'
              )}
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Link to="/register" className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-xs">
              {isNotFound ? `Claim @${username || 'handle'}` : 'Create Free Portfolio'}
            </Link>
            <Link to={isNotFound ? '/' : '/login'} className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 py-2.5 px-4 rounded-xl text-xs font-semibold transition">
              {isNotFound ? 'Back to Home' : 'Sign In'}
            </Link>
          </div>
        </div>
        <footer className="mt-8">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition">
            <span>Powered by</span><span className="font-bold text-zinc-700">linkme.</span>
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme.pageBg} ${fontStyle.styleClass} py-8 px-4 sm:px-6 flex flex-col justify-between transition-colors duration-300`}>
      <div className="max-w-2xl w-full mx-auto flex items-center justify-between mb-8">
        <Link
          to="/"
          className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-zinc-200/80 text-zinc-700 hover:text-zinc-950 hover:bg-white flex items-center gap-1.5 transition shadow-2xs"
        >
          {isOwner && <ArrowLeft size={14} />}
          <span>{isOwner ? 'Edit Profile' : 'linkme.'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="flex items-center gap-1.5 text-xs font-medium bg-white/80 backdrop-blur-xs border border-zinc-200/80 px-3 py-1.5 rounded-full text-zinc-700 shadow-2xs hover:bg-white transition cursor-pointer"
          >
            <QrCode size={14} />
            <span className="hidden sm:inline">QR Code</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-zinc-200 px-3.5 py-1.5 rounded-full text-zinc-800 shadow-2xs hover:bg-zinc-50 transition active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-600 stroke-[2.5]" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-zinc-500" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      <main className={`max-w-xl w-full mx-auto ${theme.cardBg} ${theme.cardBorder} ${theme.cardShadow} border rounded-3xl p-6 sm:p-10 shadow-lg space-y-8 transition-all duration-300`}>
        <div className="text-center space-y-3">
          <div className="relative inline-block">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name || 'User'}
                className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-black/5 border-2 border-white shadow-sm"
              />
            ) : (
              <div
                className="w-24 h-24 rounded-full text-white text-3xl font-bold flex items-center justify-center mx-auto shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                {profile.name?.charAt(0) || 'U'}
              </div>
            )}
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-2xs" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-2">
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme.textColor}`}>
                {profile.name || 'Your Name'}
              </h1>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5 shadow-2xs"
                style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
              >
                ✓
              </span>
            </div>

            <p className="text-xs font-mono text-zinc-400 mt-1">
              {profile.username ? `${portfolioHost}/${profile.username}` : 'Choose your username'}
            </p>

            {profile.title && <p className={`text-sm font-semibold mt-2 leading-snug ${theme.textColor} opacity-90`}>{profile.title}</p>}
            {profile.bio && <p className={`text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed ${theme.textColor}`}>{profile.bio}</p>}
          </div>

          {activeSocials.length > 0 && (
            <div className="flex items-center justify-center flex-wrap gap-2 pt-3">
              {activeSocials.map((platform) => {
                const Icon = SOCIAL_ICONS[platform.id] || FaShareNodes;
                return (
                  <a
                    key={platform.id}
                    href={getSocialUrl(platform.id, profile.socials[platform.id])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition hover:scale-110 active:scale-95 ${theme.textColor}`}
                    title={platform.label}
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {profile.customLinks?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-center text-zinc-400">Featured Links & Actions</h2>
            <div className="space-y-2.5">
              {profile.customLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full p-3.5 text-left transition duration-200 group relative border shadow-2xs hover:scale-[1.01] active:scale-[0.99] ${linkShape} ${link.highlight ? 'ring-2 ring-amber-400/60 shadow-md' : ''} ${theme.cardBg} ${theme.cardBorder}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition"
                        style={{
                          backgroundColor: link.highlight ? accentColor : `${accentColor}15`,
                          color: link.highlight ? '#ffffff' : accentColor,
                        }}
                      >
                        {getCustomLinkIcon(link.icon)}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-bold truncate ${theme.textColor} group-hover:underline flex items-center gap-1.5`}>
                          <span>{link.title}</span>
                          {link.highlight && (
                            <span className="text-[10px] bg-amber-400 text-zinc-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">★ Hot</span>
                          )}
                        </p>
                        {link.subtitle && <p className={`text-xs truncate ${theme.textMuted} mt-0.5`}>{link.subtitle}</p>}
                      </div>
                    </div>
                    <ExternalLink size={15} className="text-zinc-400 group-hover:text-zinc-600 transition shrink-0 mr-1" />
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {profile.photos?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-center text-zinc-400">Visual Showcase & Media</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.photos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`group rounded-2xl border ${theme.cardBorder} overflow-hidden bg-black/5 hover:shadow-md transition cursor-pointer`}
                >
                  <div className="aspect-4/3 w-full overflow-hidden bg-zinc-200 relative">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-3">
                    <p className={`text-xs font-bold truncate ${theme.textColor}`}>{photo.title}</p>
                    {photo.caption && <p className={`text-[11px] truncate ${theme.textMuted} mt-0.5`}>{photo.caption}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {profile.interests?.length > 0 && (
          <section className="space-y-2.5 text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Interests & Focus</h2>
            <div className="flex flex-wrap justify-center gap-1.5">
              {profile.interests.map((tag, idx) => (
                <span key={idx} className={`px-3 py-1 text-xs font-semibold rounded-full border ${theme.badgeBg}`}>
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {profile.achievements?.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-center text-zinc-400">Milestones & Recognition</h2>
            <div className="space-y-2">
              {profile.achievements.map((ach) => (
                <div key={ach.id} className={`flex items-center justify-between p-3 rounded-xl border ${theme.cardBorder} text-xs`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <Star size={13} className="text-amber-500 fill-amber-500 shrink-0" />
                    <span className={`font-semibold truncate ${theme.textColor}`}>{ach.title}</span>
                  </div>
                  {ach.year && <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 ${theme.badgeBg}`}>{ach.year}</span>}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="text-center py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 transition">
          <span>Powered by</span><span className="font-bold text-zinc-800">linkme.</span><span>• Create your own free link</span>
        </Link>
      </footer>

      <QrModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} username={profile.username || username} />

      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-4/3 w-full bg-zinc-950 overflow-hidden">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} className="w-full h-full object-contain" />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">{selectedPhoto.title}</h3>
                {selectedPhoto.caption && <p className="text-xs text-zinc-500 mt-0.5">{selectedPhoto.caption}</p>}
              </div>
              <div className="flex items-center gap-2">
                {selectedPhoto.link && (
                  <a
                    href={selectedPhoto.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition text-xs font-semibold flex items-center gap-1"
                  >
                    <span>Visit Link</span>
                    <ExternalLink size={12} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-3 py-1.5 border border-zinc-200 rounded-xl text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
