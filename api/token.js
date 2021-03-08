import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";
// Inicio
export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
export function getToken(token) {
  return localStorage.getItem(TOKEN);
}
export function removeToken() {
  localStorage.removeItem(TOKEN);
}
export function hasExpiredToken(token) {
  const tokenDecode = jwtDecode(token);
  const expireDate = tokenDecode.exp * 1000;
  const curentDate = new Date().getTime();
  if (curentDate > expireDate) {
    return true;
  }
  return false;
}
