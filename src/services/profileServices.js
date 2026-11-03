import api from '../api/axios.js';

export const getMyProfile = async () => (await api.get('/profiles/me')).data;
export const updateMyProfile = async (profile) => (await api.patch('/profiles/me', profile)).data;
export const getPublicProfile = async (username) => (
  await api.get(`/profiles/${encodeURIComponent(username)}`)
).data;
