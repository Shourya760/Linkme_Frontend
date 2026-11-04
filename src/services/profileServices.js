import api from '../api/axios.js';

export const getMyProfile = async () => (await api.get('/me')).data;
export const updateMyProfile = async (profile) => (await api.patch('/me', profile)).data;
export const getPublicProfile = async (username) => (
  await api.get(`/public/${encodeURIComponent(username)}`)
).data;
