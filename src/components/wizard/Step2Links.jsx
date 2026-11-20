import { useState } from 'react';
import { Plus, Trash2, Star, Link as LinkIcon } from 'lucide-react';
import { FaShareNodes } from 'react-icons/fa6';
import { PLATFORMS } from '../../utils/storage';
import { CATEGORIES, CUSTOM_LINK_ICONS, SOCIAL_ICONS } from '../../utils/socials';

const EMPTY_LINK = { title: '', url: '', subtitle: '', icon: 'link', highlight: false };

export default function Step2Links({
  profile,
  updateSocial,
  toggleSocial,
  addCustomLink,
  updateCustomLink,
  removeCustomLink,
}) {
  const [category, setCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState(EMPTY_LINK);
  const [selectedIds, setSelectedIds] = useState(() =>
    PLATFORMS.filter((p) => Boolean(profile.socials?.[p.id]?.trim())).map((p) => p.id)
  );

  const platforms = PLATFORMS.filter((p) => category === 'all' || p.category === category);
  const activeCount = PLATFORMS.filter((p) => Boolean(profile.socials?.[p.id]?.trim())).length;

  const handleTogglePlatform = (platformId) => {
    const isSelected = selectedIds.includes(platformId);
    const nextSelected = !isSelected;

    setSelectedIds((prev) =>
      nextSelected ? [...prev, platformId] : prev.filter((id) => id !== platformId)
    );

    if (toggleSocial) {
      toggleSocial(platformId, nextSelected, profile.username);
    } else if (!nextSelected) {
      updateSocial(platformId, '');
    }
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    if (!draft.title.trim() || !draft.url.trim()) return;

    addCustomLink({
      ...draft,
      title: draft.title.trim(),
      url: draft.url.trim(),
      subtitle: draft.subtitle.trim(),
    });
    setDraft(EMPTY_LINK);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-zinc-900 tracking-tight">2. Links</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Choose socials and custom links to show on your page.</p>
        </div>
        <span className="text-xs font-semibold bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full border border-zinc-200 shrink-0">
          {activeCount} Selected
        </span>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategory(cat.id)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition cursor-pointer ${category === cat.id
              ? 'bg-zinc-900 text-white shadow-2xs'
              : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Social Links */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Social links</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-3">
          {platforms.map((platform) => {
            const value = profile.socials?.[platform.id] ?? '';
            const isSelected = selectedIds.includes(platform.id) || Boolean(value.trim());
            const Icon = SOCIAL_ICONS[platform.id] || FaShareNodes;

            return (
              <div
                key={platform.id}
                className={`p-3.5 rounded-2xl border transition-all ${isSelected
                  ? 'bg-white border-zinc-900 ring-1 ring-zinc-900/10 shadow-xs'
                  : 'bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300'
                  }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition ${isSelected ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-600'
                        }`}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 truncate">{platform.label}</p>
                      <p className="text-[10px] text-zinc-400 capitalize">{platform.category}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTogglePlatform(platform.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${isSelected
                      ? 'bg-zinc-900 text-white'
                      : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                      }`}
                  >
                    {isSelected ? 'On' : 'Add'}
                  </button>
                </div>

                {isSelected && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-100">
                    <label className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                      {platform.label} handle / link
                    </label>
                    <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl px-2.5 py-1.5 text-xs focus-within:border-zinc-900 focus-within:bg-white transition">
                      {platform.prefix && (
                        <span className="text-zinc-400 font-mono text-[11px] select-none mr-0.5">
                          {platform.prefix}
                        </span>
                      )}
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateSocial(platform.id, e.target.value)}
                        placeholder={platform.placeholder}
                        className="w-full bg-transparent focus:outline-none text-zinc-900 font-medium text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Links */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Custom links</h3>
            <p className="text-xs text-zinc-500">Projects, store, newsletter, or bookings.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0"
          >
            <Plus size={14} />
            <span>Add</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleAddLink} className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  placeholder="Read My Newsletter"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-600 mb-1">URL</label>
                <input
                  type="text"
                  inputMode="url"
                  required
                  value={draft.url}
                  onChange={(e) => setDraft({ ...draft, url: e.target.value })}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Subtitle (optional)</label>
              <input
                type="text"
                value={draft.subtitle}
                onChange={(e) => setDraft({ ...draft, subtitle: e.target.value })}
                placeholder="Weekly notes on design & code"
                className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 bg-white focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-600 mb-1">Icon</label>
              <div className="flex flex-wrap gap-2">
                {CUSTOM_LINK_ICONS.map((ic) => {
                  const Icon = ic.icon;
                  const selected = draft.icon === ic.id;
                  return (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setDraft({ ...draft, icon: ic.id })}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border transition cursor-pointer ${selected
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'
                        }`}
                    >
                      <Icon size={13} />
                      <span>{ic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-zinc-700 font-medium cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={draft.highlight}
                onChange={(e) => setDraft({ ...draft, highlight: e.target.checked })}
                className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
              />
              <Star size={13} className="text-amber-500 fill-amber-500" />
              <span>Feature with highlight badge</span>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Save Link
              </button>
            </div>
          </form>
        )}

        {profile.customLinks?.length > 0 ? (
          <div className="space-y-2">
            {profile.customLinks.map((link) => {
              const Icon = CUSTOM_LINK_ICONS.find((i) => i.id === link.icon)?.icon || LinkIcon;
              return (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/90 bg-zinc-50/50 gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-zinc-200/70 text-zinc-700 flex items-center justify-center shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-zinc-900 truncate flex items-center gap-1.5">
                        <span>{link.title}</span>
                        {link.highlight && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full">
                            ★ Featured
                          </span>
                        )}
                      </p>
                      <p className="text-[11px] text-zinc-400 font-mono truncate">{link.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => updateCustomLink(link.id, { highlight: !link.highlight })}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${link.highlight
                        ? 'border-amber-300 bg-amber-50 text-amber-600'
                        : 'border-zinc-200 text-zinc-400 hover:text-amber-500 hover:bg-white'
                        }`}
                      title="Toggle featured"
                    >
                      <Star size={13} className={link.highlight ? 'fill-amber-500' : ''} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCustomLink(link.id)}
                      className="p-1.5 rounded-lg border border-zinc-200 text-zinc-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition cursor-pointer"
                      title="Delete link"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-zinc-200 rounded-xl">
            <p className="text-xs text-zinc-400">No custom links added yet.</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-1.5 text-xs text-zinc-900 font-semibold hover:underline cursor-pointer"
            >
              + Add your first custom link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}