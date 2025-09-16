import { useAuthClient } from "~/lib/auth-client";
import type { User } from "~/types/auth";

export const useAuth = () => {
  const isAuthenticated = useState("auth.isAuthenticated", () => false);
  const user = useState<User | null>("auth.user", () => null);
  const isInitialized = useState("auth.isInitialized", () => false);
  const error = useState("auth.error", () => null);

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
      error.value = null;
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
    } catch (err: Error | any) {
      error.value = err;
      console.error("Auth initialization failed:", err);
      return false;
    }
  };

  const loadUser = async () => {
    try {
      user.value = (await authClient.getUserInfo()) ?? null;
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
      try {
        const { disconnect } = useSignalR();
        await disconnect();
      } catch (error) {
        console.warn("SignalR disconnect failed:", error);
      }

      // Reset state BEFORE calling authClient.logOut
      isAuthenticated.value = false;
      user.value = null;
      isInitialized.value = false;

      // Call Keycloak logout - this will redirect to Keycloak and then back
      await authClient.logOut(window.location.origin + "/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Force redirect to login even if logout fails
      await navigateTo("/login", { replace: true, external: true });
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
    error: readonly(error),

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
    clearError: () => (error.value = null),
  };
};
