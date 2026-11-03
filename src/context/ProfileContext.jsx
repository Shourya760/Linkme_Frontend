import { useState, useEffect } from 'react';
import ProfileContext from './profileContext.js';
import { getStoredProfile, saveStoredProfile, EMPTY_PROFILE, normalizeProfile, EVENT_NAME } from '../utils/storage';
import { getMyProfile, updateMyProfile } from '../services/profileServices.js';
import { logoutUser as logoutRequest } from '../services/userServices.js';

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
          setProfile(normalizeProfile(EMPTY_PROFILE));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const handleSync = () => setProfile(getStoredProfile());
    window.addEventListener(EVENT_NAME, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(EVENT_NAME, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const commitProfile = (updated) => {
    setProfile(updated);
    saveStoredProfile(updated);
  };

  const updateProfile = (fields) => commitProfile({ ...profile, ...fields });
  const updateList = (key, updater) => commitProfile({ ...profile, [key]: updater(profile[key] || []) });

  const saveProfile = async () => {
    if (loading) throw new Error('Your profile is still loading. Please try again.');
    setSaving(true);
    try {
      const { email } = profile;
      const excluded = new Set(['email', 'isAuthenticated', 'userId', '_id', 'createdAt', 'updatedAt', '__v']);
      const profileData = Object.fromEntries(
        Object.entries(profile).filter(([k]) => !excluded.has(k))
      );
      // Older versions allowed free-form achievement years. Keep the achievement,
      // but omit legacy values the API schema cannot accept (for example 8903).
      if (Array.isArray(profileData.achievements)) {
        profileData.achievements = profileData.achievements.map((achievement) => {
          const year = Number(achievement.year);
          if (achievement.year == null || achievement.year === '' || (Number.isInteger(year) && year >= 1900 && year <= 2200)) {
            return achievement;
          }
          const { year: _invalidYear, ...validAchievement } = achievement;
          return validAchievement;
        });
      }
      let response;
      try {
        response = await updateMyProfile(profileData);
      } catch (error) {
        throw new Error(error.response?.data?.message || error.message || 'Could not save your profile.');
      }
      const { profile: saved } = response;
      const updated = normalizeProfile({ ...saved, email });
      commitProfile(updated);
      return updated;
    } finally {
      setSaving(false);
    }
  };

  const updateTheme = (fields) => updateProfile({ theme: { ...profile.theme, ...fields } });
  const updateSocial = (network, handle) => updateProfile({ socials: { ...profile.socials, [network]: handle } });

  const toggleSocial = (network, enable, defaultHandle = '') => {
    const current = profile.socials?.[network] || '';
    const newHandle = enable ? (current || defaultHandle || profile.username || '') : '';
    updateSocial(network, newHandle);
  };

  const addCustomLink = (link) => {
    const item = {
      id: Date.now().toString(),
      title: link.title || 'My Featured Link',
      url: link.url || 'https://',
      subtitle: link.subtitle || '',
      highlight: Boolean(link.highlight),
      icon: link.icon || 'link',
    };
    updateList('customLinks', (links) => [...links, item]);
  };

  const updateCustomLink = (id, fields) => {
    updateList('customLinks', (links) => links.map((l) => (l.id === id ? { ...l, ...fields } : l)));
  };

  const removeCustomLink = (id) => {
    updateList('customLinks', (links) => links.filter((l) => l.id !== id));
  };

  const addPhoto = (photo) => {
    const item = {
      id: Date.now().toString(),
      url: photo.url,
      title: photo.title || 'Featured Work',
      caption: photo.caption || '',
      link: photo.link || '',
    };
    updateList('photos', (photos) => [...photos, item]);
  };

  const removePhoto = (id) => {
    updateList('photos', (photos) => photos.filter((p) => p.id !== id));
  };

  const addInterest = (interest) => {
    const trimmed = interest.trim();
    if (!trimmed) return;
    updateList('interests', (items) => (items.includes(trimmed) ? items : [...items, trimmed]));
  };

  const removeInterest = (interest) => {
    updateList('interests', (items) => items.filter((i) => i !== interest));
  };

  const addAchievement = (title, year) => {
    const t = title.trim();
    if (!t) return;
    const item = {
      id: Date.now().toString(),
      title: t,
      year: year.trim() || new Date().getFullYear().toString(),
    };
    updateList('achievements', (items) => [item, ...items]);
  };

  const removeAchievement = (id) => {
    updateList('achievements', (items) => items.filter((a) => a.id !== id));
  };

  const login = (email, serverProfile) => {
    const updated = normalizeProfile({ ...(serverProfile || EMPTY_PROFILE), email: email || '', isAuthenticated: true });
    commitProfile(updated);
  };

  const register = (name, username, email, serverProfile) => {
    const updated = {
      ...profile,
      ...(serverProfile || {}),
      name: name || profile.name,
      username: username || profile.username,
      email: email || profile.email,
      isAuthenticated: true,
    };
    commitProfile(updated);
  };

  const logout = async () => {
    try { await logoutRequest(); } catch { /* ignore network error on logout */ }
    localStorage.removeItem('linkme_token');
    localStorage.removeItem('linkme_profile');
    setProfile(normalizeProfile(EMPTY_PROFILE));
    window.dispatchEvent(new Event(EVENT_NAME));
  };

  const resetToDefault = () => {
    const cleared = normalizeProfile({
      ...EMPTY_PROFILE,
      username: profile.username,
      email: profile.email,
    });
    commitProfile(cleared);
  };

  return (
    <ProfileContext.Provider
      value={{
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
