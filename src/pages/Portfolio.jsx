
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Check,
  Copy,
  ExternalLink,
  ArrowLeft,
  Star,
  QrCode,
  Sparkles,
  UserX,
} from 'lucide-react';
import { FaShareNodes } from 'react-icons/fa6';
import { useProfile } from '../context/useProfile.js';
import { THEMES, BUTTON_STYLES, FONT_STYLES, PLATFORMS } from '../utils/storage';
import { getPortfolioUrl, getPortfolioHost } from '../utils/portfolioUrl';
import { getPublicProfile } from '../services/profileServices.js';
import { SOCIAL_ICONS, getSocialUrl, getCustomLinkIcon } from '../utils/socials';
import QrModal from '../components/qr-modal.jsx';

export default function Portfolio() {
  const { username } = useParams();
  const { profile: localProfile } = useProfile();

  const [remoteResult, setRemoteResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const isSelf =
    !username ||
    (localProfile.username &&
      username.toLowerCase() === localProfile.username.toLowerCase());

  const isOwner = Boolean(isSelf && (localProfile.username || localProfile.name));

  useEffect(() => {
    if (!username || isSelf) return;

    let cancelled = false;

    getPublicProfile(username)
      .then(({ profile: fetched }) => {
        if (!cancelled) setRemoteResult({ username, profile: fetched });
      })
      .catch((error) => {
        if (!cancelled) {
          setRemoteResult({
            username,
            error: error.response?.data?.message || 'Portfolio not found',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [username, isSelf]);

  const currentResult = remoteResult?.username === username ? remoteResult : null;
  const publicProfileError = currentResult?.error || '';
  const isLoading = Boolean(username && !isSelf && !currentResult);
  const profile = isSelf ? localProfile : currentResult?.profile;

  const portfolioHost = getPortfolioHost();
  const shareUrl = getPortfolioUrl(profile?.username || username);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy portfolio link:', error);
    }
  };

  const theme =
    THEMES.find((t) => t.id === profile?.theme?.id) || THEMES[0];

  const btnStyle =
    BUTTON_STYLES.find((b) => b.id === profile?.theme?.buttonStyle) ||
    BUTTON_STYLES[1];

  const fontStyle =
    FONT_STYLES.find((f) => f.id === profile?.theme?.fontStyle) ||
    FONT_STYLES[0];

  const accentColor = profile?.theme?.accentColor || theme.accentColor;

  const activeSocials = PLATFORMS.filter((p) =>
    profile?.socials?.[p.id]?.trim()
  );

  const linkShape =
    btnStyle.id === 'pill'
      ? 'rounded-full'
      : btnStyle.id === 'square'
        ? 'rounded-md'
        : 'rounded-lg';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-zinc-500">
        Loading portfolio…
      </div>
    );
  }

  if (
    publicProfileError ||
    (!profile && username) ||
    (!username && !localProfile.username && !localProfile.name)
  ) {
    const isNotFound = Boolean(publicProfileError);

    return (
      <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white border border-zinc-200/90 rounded-3xl p-8 sm:p-10 shadow-xl space-y-5">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto ${isNotFound
              ? 'bg-zinc-100 text-zinc-600'
              : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              }`}
          >
            {isNotFound ? <UserX size={32} /> : <Sparkles size={30} />}
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              {isNotFound ? 'Portfolio Not Found' : 'Build Your LinkMe Portfolio'}
            </h1>

            <p className="text-sm text-zinc-500 leading-relaxed">
              {isNotFound ? (
                <>
                  We couldn't find a public portfolio for{' '}
                  <span className="font-mono font-semibold text-zinc-800">
                    @{username}
                  </span>
                  .
                </>
              ) : (
                'No portfolio was specified. Create your free link in bio to showcase your work, socials, and links in minutes.'
              )}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <Link
              to="/builder"
              className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-xs"
            >
              {isNotFound ? 'Open editor' : 'Create Portfolio'}
            </Link>

            <Link
              to="/settings"
              className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 py-2.5 px-4 rounded-xl text-xs font-semibold transition"
            >
              Settings
            </Link>
          </div>
        </div>

        <footer className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 transition"
          >
            <span>Powered by</span>
            <span className="font-bold text-zinc-700">linkme.</span>
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${theme.pageBg} ${fontStyle.styleClass} px-4 py-6 sm:px-6 lg:px-10 transition-colors duration-300 overflow-x-hidden`}
    >
      {/* Top Bar */}
      <div className="max-w-3xl w-full mx-auto flex items-center justify-between gap-2 mb-6">        <Link
        to={isOwner ? '/builder' : '/'}
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

      {/* Portfolio Content */}
      <main
        className={`max-w-2xl w-full mx-auto ${theme.cardBg} ${theme.cardBorder} border rounded-2xl p-4 sm:p-6 lg:p-8 space-y-5 transition-all duration-300`}
      >
        {/* Profile */}
        <div
          className={`${theme.cardBg} ${theme.cardBorder} border rounded-xl p-3 text-center`}
        >
          <div className="relative inline-block mb-2">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name || 'User'}
                className="w-14 h-14 rounded-full object-cover mx-auto"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: accentColor }}
              >
                {profile.name?.charAt(0) || 'U'}
              </div>
            )}

            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>

          <div className="flex items-center justify-center gap-1">
            <h1 className={`text-sm font-bold truncate ${theme.textColor}`}>
              {profile.name || 'Your Name'}
            </h1>

            <span
              className="text-[9px] rounded-full px-1"
              style={{ color: accentColor }}
            >
              ✓
            </span>
          </div>

          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
            {profile.username
              ? `${portfolioHost}/${profile.username}`
              : 'Choose your username'}
          </p>

          {profile.title && (
            <p className={`text-[11px] mt-1 ${theme.textColor}`}>
              {profile.title}
            </p>
          )}

          {profile.bio && (
            <p
              className={`text-[10px] mt-1.5 leading-relaxed line-clamp-3 ${theme.textMuted}`}
            >
              {profile.bio}
            </p>
          )}

          {/* Socials */}
          {activeSocials.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-2.5 pt-2 border-t border-black/5">
              {activeSocials.map((platform) => {
                const Icon = SOCIAL_ICONS[platform.id] || FaShareNodes;
                const value = profile?.socials?.[platform.id];

                return (
                  <a
                    key={platform.id}
                    href={getSocialUrl(platform.id, value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={platform.label}
                    className={`w-7 h-7 rounded-full bg-black/5 flex items-center justify-center ${theme.textColor}`}
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Featured Links */}
        {profile.customLinks?.length > 0 && (
          <section className="space-y-1.5">
            <div className="flex justify-between px-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              <span>Featured Links</span>
              <span>{profile.customLinks.length} Links</span>
            </div>

            {profile.customLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 border ${linkShape} ${theme.cardBg} ${theme.cardBorder} transition hover:opacity-90 ${link.highlight ? 'ring-1 ring-amber-400/70 shadow-sm' : ''
                  }`}
              >
                <span
                  className="w-9 h-9 shrink-0 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: link.highlight
                      ? accentColor
                      : `${accentColor}20`,
                    color: link.highlight ? '#fff' : accentColor,
                  }}
                >
                  {getCustomLinkIcon(link.icon)}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`flex items-center gap-1 text-[10px] font-semibold ${theme.textColor}`}
                  >
                    <span className="truncate">{link.title}</span>

                    {link.highlight && (
                      <span className="shrink-0 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold uppercase text-zinc-950">
                        ★ Hot
                      </span>
                    )}
                  </span>

                  {link.subtitle && (
                    <span
                      className={`block truncate text-[9px] ${theme.textMuted}`}
                    >
                      {link.subtitle}
                    </span>
                  )}
                </span>

                <ExternalLink size={11} className="shrink-0 text-zinc-400" />
              </a>
            ))}
          </section>
        )}

        {/* Photos */}
        {profile.photos?.length > 0 && (
          <section className="space-y-1.5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Photos & Showcase
            </p>

            <div className="grid grid-cols-2 gap-1.5">
              {profile.photos.slice(0, 4).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`overflow-hidden rounded-lg border ${theme.cardBg} ${theme.cardBorder} cursor-pointer`}
                >
                  <img
                    src={photo.url}
                    alt={photo.title || 'Work'}
                    className="w-full aspect-[4/3] object-cover"
                  />

                  <p className={`p-1 text-[9px] truncate ${theme.textColor}`}>
                    {photo.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {profile.interests?.length > 0 && (
          <section>
            <p className="text-[9px] font-bold uppercase text-zinc-400 mb-1">
              Interests
            </p>

            <div className="flex flex-wrap gap-1">
              {profile.interests.map((tag, i) => (
                <span
                  key={i}
                  className={`text-[9px] px-2 py-1 rounded-full border ${theme.badgeBg}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {profile.achievements?.length > 0 && (
          <section className="space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
              Achievements
            </p>

            {profile.achievements.slice(0, 3).map((ach) => (
              <div
                key={ach.id}
                className={`flex items-center justify-between gap-2 p-2 rounded-lg border text-[10px] ${theme.cardBg} ${theme.cardBorder}`}
              >
                <span className={`truncate ${theme.textColor}`}>
                  {ach.title}
                </span>

                {ach.year && (
                  <span className="text-[9px] text-zinc-400 shrink-0">
                    {ach.year}
                  </span>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Footer inside portfolio */}
        <div className="text-center py-2 text-[9px] text-zinc-400">
          Powered by <span className="font-bold">linkme.</span>
        </div>
      </main>

      {/* QR Modal */}
      <QrModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        username={profile.username || username}
      />

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-4/3 w-full bg-zinc-950 overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-zinc-900 truncate">
                  {selectedPhoto.title}
                </h3>

                {selectedPhoto.caption && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    {selectedPhoto.caption}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
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
