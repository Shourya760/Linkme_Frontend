import { BookOpen, Calendar, Code, ExternalLink, LinkIcon, ShoppingBag, Sparkles } from 'lucide-react';
import { FaBehance, FaDiscord, FaDribbble, FaEnvelope, FaFacebook, FaGithub, FaGlobe, FaInstagram, FaLinkedin, FaShareNodes, FaSpotify, FaTelegram, FaTiktok, FaTwitch, FaWhatsapp, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { THEMES, BUTTON_STYLES, FONT_STYLES, PLATFORMS } from '../utils/storage';
import { getPortfolioHost } from '../utils/portfolioUrl';

const SOCIAL_ICONS = {
  instagram: FaInstagram, youtube: FaYoutube, facebook: FaFacebook,
  x: FaXTwitter, linkedin: FaLinkedin, github: FaGithub, tiktok: FaTiktok,
  spotify: FaSpotify, discord: FaDiscord, twitch: FaTwitch,
  whatsapp: FaWhatsapp, telegram: FaTelegram, email: FaEnvelope,
  website: FaGlobe, behance: FaBehance, dribbble: FaDribbble
};

export default function DevicePreview({ profile }) {
  const activeTheme = THEMES.find(t => t.id === profile?.theme?.id) || THEMES[0];
  const activeButtonStyle = BUTTON_STYLES.find(b => b.id === profile?.theme?.buttonStyle) || BUTTON_STYLES[1];
  const activeFontStyle = FONT_STYLES.find(f => f.id === profile?.theme?.fontStyle) || FONT_STYLES[0];
  const accentColor = profile?.theme?.accentColor || activeTheme.accentColor;

  // Get active socials
  const activeSocials = PLATFORMS.filter(p => profile?.socials?.[p.id]?.trim());

  const getCustomLinkIcon = (iconName) => {
    switch (iconName) {
      case 'book': return <BookOpen size={15} />;
      case 'calendar': return <Calendar size={15} />;
      case 'code': return <Code size={15} />;
      case 'shop': return <ShoppingBag size={15} />;
      case 'sparkles': return <Sparkles size={15} />;
      default: return <LinkIcon size={15} />;
    }
  };

  const getSocialUrl = (platformId, val) => {
    if (!val) return '#';
    if (val.startsWith('http://') || val.startsWith('https://')) return val;
    switch (platformId) {
      case 'x': return `https://x.com/${val.replace('@', '')}`;
      case 'instagram': return `https://instagram.com/${val.replace('@', '')}`;
      case 'youtube': return val.startsWith('@') ? `https://youtube.com/${val}` : `https://youtube.com/@${val}`;
      case 'linkedin': return `https://linkedin.com/in/${val}`;
      case 'github': return `https://github.com/${val}`;
      case 'tiktok': return `https://tiktok.com/@${val.replace('@', '')}`;
      case 'spotify': return `https://open.spotify.com/user/${val}`;
      case 'discord': return `https://discord.gg/${val}`;
      case 'twitch': return `https://twitch.tv/${val}`;
      case 'whatsapp': return `https://wa.me/${val.replace(/[^0-9]/g, '')}`;
      case 'telegram': return `https://t.me/${val.replace('@', '')}`;
      case 'email': return `mailto:${val}`;
      case 'behance': return `https://behance.net/${val}`;
      case 'dribbble': return `https://dribbble.com/${val}`;
      case 'facebook': return `https://facebook.com/${val}`;
      case 'website': return val.startsWith('http') ? val : `https://${val}`;
      default: return `https://${val}`;
    }
  };

  const renderCustomLink = (link) => {
    const shape = activeButtonStyle.id === 'pill'
      ? 'rounded-full'
      : activeButtonStyle.id === 'square'
        ? 'rounded-md'
        : 'rounded-lg';

    return (
      <a
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 p-2 border ${shape} ${activeTheme.cardBg} ${activeTheme.cardBorder} ${link.highlight ? 'ring-1 ring-amber-400/70 shadow-sm' : ''}`}
      >
        <span
          className="w-7 h-7 shrink-0 rounded-md flex items-center justify-center"
          style={{
            backgroundColor: link.highlight ? accentColor : `${accentColor}20`,
            color: link.highlight ? '#fff' : accentColor,
          }}
        >
          {getCustomLinkIcon(link.icon)}
        </span>
        <span className="min-w-0 flex-1">
          <span className={`flex items-center gap-1 text-[10px] font-semibold ${activeTheme.textColor}`}>
            <span className="truncate">{link.title}</span>
            {link.highlight && (
              <span className="shrink-0 rounded-full bg-amber-400 px-1.5 py-0.5 text-[8px] font-bold uppercase text-zinc-950">
                ★ Hot
              </span>
            )}
          </span>
          {link.subtitle && (
            <span className={`block truncate text-[9px] ${activeTheme.textMuted}`}>
              {link.subtitle}
            </span>
          )}
        </span>
        <ExternalLink size={11} className="shrink-0 text-zinc-400" />
      </a>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col items-center w-full gap-3">
      <div className="flex w-full shrink-0 items-center justify-between px-1 text-xs">
        <span className="font-semibold text-zinc-800">Live preview</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          In sync
        </span>
      </div>

      {/* Phone frame */}
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <div className="w-full max-w-[250px] sm:max-w-[270px] lg:max-w-[290px]">
          <div className="relative rounded-[32px] bg-zinc-900 p-1.5 shadow-xl ring-1 ring-zinc-800">

            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between w-20 h-3.5 px-2 rounded-full bg-black">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
            </div>

            {/* Phone Screen */}
            <div
              className={`relative w-full h-[min(560px,calc(100dvh-12rem))] lg:h-[min(680px,calc(100dvh-10rem))] min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] rounded-[26px] border border-black/10 ${activeTheme.pageBg} ${activeFontStyle.styleClass} transition-colors duration-300`}
            >
              {/* Status Bar */}
              <div className="flex justify-between px-5 pt-5 pb-2 text-[9px] font-semibold opacity-75">
                <span className={activeTheme.textColor}>9:41</span>
                <span className={activeTheme.textColor}>▰ 5G</span>
              </div>

              <div className="p-3 space-y-3">
                {/* Profile */}
                <div className={`${activeTheme.cardBg} ${activeTheme.cardBorder} border rounded-xl p-3 text-center`}>
                  <div className="relative inline-block mb-2">
                    {profile?.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name || "User"}
                        className="w-14 h-14 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                        style={{ backgroundColor: accentColor }}
                      >
                        {profile?.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>

                  <div className="flex items-center justify-center gap-1">
                    <h2 className={`text-sm font-bold truncate ${activeTheme.textColor}`}>
                      {profile?.name || "Your Name"}
                    </h2>
                    <span
                      className="text-[9px] rounded-full px-1"
                      style={{ color: accentColor }}
                    >
                      ✓
                    </span>
                  </div>

                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {profile?.username
                      ? `${getPortfolioHost()}/${profile.username}`
                      : "Choose your username"}
                  </p>

                  {profile?.title && (
                    <p className={`text-[11px] mt-1 ${activeTheme.textColor}`}>
                      {profile.title}
                    </p>
                  )}

                  {profile?.bio && (
                    <p className={`text-[10px] mt-1.5 leading-relaxed line-clamp-3 ${activeTheme.textMuted}`}>
                      {profile.bio}
                    </p>
                  )}

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
                            className={`w-7 h-7 rounded-full bg-black/5 flex items-center justify-center  ${activeTheme.textColor}`}
                          >
                            <Icon size={17} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Featured Links */}
                {profile?.customLinks?.length > 0 && (
                  <section className="space-y-1.5">
                    <div className="flex justify-between px-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      <span>Featured Links</span>
                      <span>{profile.customLinks.length} Links</span>
                    </div>
                    {profile.customLinks.map(renderCustomLink)}
                  </section>
                )}

                {/* Photos */}
                {profile?.photos?.length > 0 && (
                  <section className="space-y-1.5">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                      Photos & Showcase
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {profile.photos.slice(0, 4).map((photo) => (
                        <div
                          key={photo.id}
                          className={`overflow-hidden rounded-lg border ${activeTheme.cardBg} ${activeTheme.cardBorder}`}
                        >
                          <img
                            src={photo.url}
                            alt={photo.title || "Work"}
                            className="w-full aspect-[4/3] object-cover"
                          />
                          <p className={`p-1 text-[9px] truncate ${activeTheme.textColor}`}>
                            {photo.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Interests */}
                {profile?.interests?.length > 0 && (
                  <section>
                    <p className="text-[9px] font-bold uppercase text-zinc-400 mb-1">
                      Interests
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {profile.interests.map((tag, i) => (
                        <span
                          key={i}
                          className={`text-[9px] px-2 py-1 rounded-full border ${activeTheme.badgeBg}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

                {/* Achievements */}
                {profile?.achievements?.length > 0 && (
                  <section className="space-y-1">
                    <p className="text-[9px] font-bold uppercase text-zinc-400">
                      Achievements
                    </p>
                    {profile.achievements.slice(0, 3).map((ach) => (
                      <div
                        key={ach.id}
                        className={`flex items-center justify-between gap-2 p-2 rounded-lg border text-[10px] ${activeTheme.cardBg} ${activeTheme.cardBorder}`}
                      >
                        <span className={`truncate ${activeTheme.textColor}`}>
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

                {/* Footer */}
                <div className="text-center py-2 text-[9px] text-zinc-400">
                  Powered by <span className="font-bold">linkme.</span>
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
              <div className="w-16 h-1 rounded-full bg-white/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
