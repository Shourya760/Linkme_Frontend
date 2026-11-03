import api from '../api/axios.js';

export const registerUser = async (data) => (await api.post('/auth/register', data)).data;
export const loginUser = async (data) => (await api.post('/auth/login', data)).data;
export const logoutUser = async () => (await api.post('/auth/logout')).data;
export const deactivateUser = async () => (await api.delete('/auth/account')).data;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return (await api.post('/uploads/image', formData)).data;
};
