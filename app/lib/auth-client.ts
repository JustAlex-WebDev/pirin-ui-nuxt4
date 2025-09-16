import {
  initAuth,
  isLogged,
  getToken,
  refreshToken,
  logIn,
  logOut,
  getRoles,
  getUserInfo,
  isAuthenticated,
  accessTokenExpiration,
  refreshTokenExpiration,
  accessTokenTimeLeft,
  refreshTokenTimeLeft,
} from "~/lib/auth";

export function useAuthClient() {
  return {
    initAuth,
    isLogged,
    getToken,
    refreshToken,
    logIn,
    logOut,
    getRoles,
    getUserInfo,
    isAuthenticated,
    accessTokenExpiration,
    refreshTokenExpiration,
    accessTokenTimeLeft,
    refreshTokenTimeLeft,
  };
}
