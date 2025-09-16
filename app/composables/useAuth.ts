import { useAuthClient } from "~/lib/auth-client";

export const useAuth = () => {
  const isAuthenticated = useState("auth.isAuthenticated", () => false);
  const user = useState("auth.user", () => null as any);
  const isInitialized = useState("auth.isInitialized", () => false);

  const authClient = useAuthClient();

  //
  // Computed
  //
  const displayName = computed(() => {
    if (user.value?.name) return user.value.name;
    if (user.value?.preferred_username) return user.value.preferred_username;
    if (user.value?.email) return user.value.email;
    return "Потребител";
  });

  //
  // Methods
  //
  const init = async (onLoad: "login-required" | "check-sso" = "check-sso") => {
    if (isInitialized.value) {
      return isAuthenticated.value;
    }

    try {
      const config = useRuntimeConfig();
      const authenticated = await authClient.initAuth(onLoad, {
        kcUrl: config.public.OIDC_AUTHORITY,
        kcRealm: config.public.OIDC_REALM,
        kcClientId: config.public.OIDC_CLIENT_ID,
      });

      isAuthenticated.value = authenticated;
      isInitialized.value = true;

      if (authenticated) {
        await loadUser();
      }

      return authenticated;
    } catch (error) {
      console.error("Auth initialization failed:", error);
      return false;
    }
  };

  const loadUser = async () => {
    try {
      user.value = await authClient.getUserInfo();
    } catch (error) {
      console.error("Failed to load user:", error);
    }
  };

  const login = async (redirectUri?: string) => {
    try {
      await authClient.logIn(redirectUri);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      // Disconnect SignalR first
      const { disconnect } = useSignalR();
      await disconnect();

      await authClient.logOut();

      // Reset state
      isAuthenticated.value = false;
      user.value = null;
      isInitialized.value = false;
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const refreshUserInfo = async () => {
    await loadUser();
  };

  return {
    // State
    isAuthenticated: readonly(isAuthenticated),
    user: readonly(user),
    displayName,

    // Auth client passthrough
    getRoles: authClient.getRoles,
    getToken: authClient.getToken,
    refreshToken: authClient.refreshToken,
    accessTokenTimeLeft: authClient.accessTokenTimeLeft,
    refreshTokenTimeLeft: authClient.refreshTokenTimeLeft,

    // Methods
    init,
    login,
    logout,
    refreshUserInfo,
  };
};
