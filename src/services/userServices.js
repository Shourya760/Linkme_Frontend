import api from '../api/axios.js';

export const registerUser = async (data) => (await api.post('/register', data)).data;
export const loginUser = async (data) => (await api.post('/login', data)).data;
export const logoutUser = async () => (await api.post('/logout')).data;
export const deactivateUser = async () => (await api.delete('/account')).data;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return (await api.post('/upload', formData)).data;
};
