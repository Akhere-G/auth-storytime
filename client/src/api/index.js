import axios from "axios";
export const getStories = () => axios.get(`/api/stories`);

export const addStory = (newStory, config) =>
  axios.post(`/api/stories`, newStory, config);

export const deleteStory = (id, config) =>
  axios.delete(`/api/stories/${id}`, config);

export const updateStory = (id, newStory, config) =>
  axios.patch(`/api/stories/${id}`, newStory, config);

export const getUsers = () => axios.get(`/api/users`);

export const getUser = id => axios.get(`/api/users/${id}`);

export const addUser = (body, config) => axios.post(`/api/users`, body, config);

export const updateUser = (id, newUser) =>
  axios.patch(`/api/users/${id}`, newUser);

export const deleteUser = id => axios.delete(`/api/users/${id}`);

export const login = (body, config) => axios.post(`/api/auth`, body, config);

export const authUser = (body, config) =>
  axios.get(`/api/auth/user`, body, config);
