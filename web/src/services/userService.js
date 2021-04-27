import http from "./http";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const tokenKey = "token";

//--- user info---//
export const userInfo = () => {
  return http.get(`${apiUrl}/users/me`).then((resp) => resp.data);
};

//--- ALL USERS---//
export const getAll = () => {
  return http.get(`${apiUrl}/users/all`).then((resp) => resp.data);
};

//--- DELETE USER---//
export const deleteUser = (_id) => {
  return http.delete(`${apiUrl}/users/${_id}`);
};

//---USER INFO---//
export const userInfoById = (userId) => {
  return http
    .get(`${apiUrl}/users/userParam/${userId}`)
    .then((resp) => resp.data);
};

//--- UPDATR USER---//
export const updateUser = (user) => {
  const userId = user._id;
  delete user._id;
  return http.put(`${apiUrl}/users/${userId}`, user);
};

//--- LOGIN---//
export const login = async (email, password) => {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
};

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch {
    return null;
  }
};

//--- LOGOUT---//
export const logout = () => {
  localStorage.removeItem(tokenKey);
};

const service = {
  getAll,
  deleteUser,
  userInfoById,
  updateUser,
  login,
  getCurrentUser,
  logout,
  userInfo,
};

export default service;
