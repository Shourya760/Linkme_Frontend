import { useEffect, useState } from 'react';
import ProfileContext from './profileContext.js';
import { EMPTY_PROFILE, getStoredProfile, normalizeProfile, saveStoredProfile } from '../utils/storage.js';
import { getMyProfile, updateMyProfile } from '../services/profileServices.js';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(getStoredProfile);
  const [loading, setLoading] = useState(() => Boolean(localStorage.getItem('linkme_token')));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('linkme_token')) return;
    let cancelled = false;
    getMyProfile()
      .then(({ profile: remote }) => {
        if (cancelled) return;
        const next = normalizeProfile({ ...remote, email: remote.email || getStoredProfile().email });
        saveStoredProfile(next);
        setProfile(next);
      })
      .catch((error) => {
        if (!cancelled && error.response?.status === 401) {
          localStorage.removeItem('linkme_token');
          localStorage.removeItem('linkme_profile');
          setProfile(normalizeProfile(EMPTY_PROFILE));
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const updateProfile = (fields) => {
    const next = normalizeProfile({ ...profile, ...fields });
    setProfile(next);
    saveStoredProfile(next);
  };

  const updateList = (key, updater) => updateProfile({ [key]: updater(profile[key] || []) });
  const updateTheme = (fields) => updateProfile({ theme: { ...profile.theme, ...fields } });
  const updateSocial = (network, handle) => updateProfile({ socials: { ...profile.socials, [network]: handle } });
  const toggleSocial = (network, enable, defaultHandle = '') => {
    const current = profile.socials?.[network] || '';
    updateSocial(network, enable ? current || defaultHandle || profile.username || '' : '');
  };

  const addCustomLink = (link) => updateList('customLinks', (links) => [...links, {
    id: crypto.randomUUID(),
    title: link.title || 'My Featured Link',
    url: link.url || 'https://',
    subtitle: link.subtitle || '',
    highlight: Boolean(link.highlight),
    icon: link.icon || 'link',
  }]);
  const updateCustomLink = (id, fields) => updateList('customLinks', (links) => links.map((link) => link.id === id ? { ...link, ...fields } : link));
  const removeCustomLink = (id) => updateList('customLinks', (links) => links.filter((link) => link.id !== id));
  const addPhoto = (photo) => updateList('photos', (photos) => [...photos, {
    id: crypto.randomUUID(),
    url: photo.url,
    title: photo.title || 'Featured Work',
    caption: photo.caption || '',
    link: photo.link || '',
  }]);
  const removePhoto = (id) => updateList('photos', (photos) => photos.filter((photo) => photo.id !== id));
  const addInterest = (interest) => {
    const value = interest.trim();
    if (value) updateList('interests', (items) => items.includes(value) ? items : [...items, value]);
  };
  const removeInterest = (interest) => updateList('interests', (items) => items.filter((item) => item !== interest));
  const addAchievement = (title, year) => {
    const value = title.trim();
    if (value) updateList('achievements', (items) => [{
      id: crypto.randomUUID(),
      title: value,
      year: year.trim() || String(new Date().getFullYear()),
    }, ...items]);
  };
  const removeAchievement = (id) => updateList('achievements', (items) => items.filter((item) => item.id !== id));
  const resetToDefault = () => {
    const next = normalizeProfile({ ...EMPTY_PROFILE, username: profile.username, name: profile.name });
    setProfile(next);
    saveStoredProfile(next);
  };
  const saveProfile = async () => {
    setSaving(true);
    try {
      const { profile: saved } = await updateMyProfile(profile);
      const next = normalizeProfile({ ...saved, email: profile.email });
      setProfile(next);
      saveStoredProfile(next);
      return next;
    } finally {
      setSaving(false);
    }
  };

  const login = (user, serverProfile) => {
    const next = normalizeProfile({ ...(serverProfile || EMPTY_PROFILE), email: user?.email || '' });
    setProfile(next);
    saveStoredProfile(next);
  };

  const register = (user, serverProfile) => login(user, serverProfile);

  const logout = async () => {
    localStorage.removeItem('linkme_token');
    localStorage.removeItem('linkme_profile');
    const next = normalizeProfile(EMPTY_PROFILE);
    setProfile(next);
    saveStoredProfile(next);
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      loading,
      saving,
      saveProfile,
      updateProfile,
      updateTheme,
      updateSocial,
      toggleSocial,
      addCustomLink,
      updateCustomLink,
      removeCustomLink,
      addPhoto,
      removePhoto,
      addInterest,
      removeInterest,
      addAchievement,
      removeAchievement,
      login,
      register,
      logout,
      resetToDefault,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
