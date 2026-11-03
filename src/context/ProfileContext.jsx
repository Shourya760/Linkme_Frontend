import { useState } from 'react';
import ProfileContext from './profileContext.js';
import { EMPTY_PROFILE, getStoredProfile, normalizeProfile, saveStoredProfile } from '../utils/storage.js';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(getStoredProfile);

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
  const saveProfile = async () => profile;

  return (
    <ProfileContext.Provider value={{
      profile,
      loading: false,
      saving: false,
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
      resetToDefault,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}
