import Keycloak from "keycloak-js";

let keycloak: Keycloak | null = null;
let keycloakInitialized = false;
export let isAuthenticated: boolean = false;
let tokenCheckInterval: NodeJS.Timeout | null = null;
let autoRefreshInterval: NodeJS.Timeout | null = null;

// Reactive state for UI
export let accessTokenExpiration = ref<number | null>(null);
export let refreshTokenExpiration = ref<number | null>(null);
export let accessTokenTimeLeft = ref<string>("00:00");
export let refreshTokenTimeLeft = ref<string>("00:00");

// Initialize Keycloak
export async function initAuth(
  onLoad: "login-required" | "check-sso" = "login-required",
  runtimeConfig: { kcUrl: string; kcRealm: string; kcClientId: string }
): Promise<boolean> {
  if (!keycloak) {
    // Initialize Keycloak instance dynamically
    keycloak = new Keycloak({
      url: runtimeConfig.kcUrl,
      realm: runtimeConfig.kcRealm,
      clientId: runtimeConfig.kcClientId,
    });
  }

  if (isAuthenticated !== null && keycloakInitialized) {
    return isAuthenticated;
  }

  try {
    isAuthenticated = await keycloak.init({
      onLoad,
      checkLoginIframe: false,
    });
    keycloakInitialized = true;

    if (isAuthenticated) {
      startTokenExpirationTracking();
      startAutoTokenRefresh();
    }

    return isAuthenticated;
  } catch (error) {
    console.error("Keycloak initialization failed:", error);
    return false;
  }
}

// Check if the user is authenticated
export function isLogged(): boolean {
  return isAuthenticated;
}

// Get the JWT token
export function getToken(): string | null {
  return keycloak?.token || null;
}

// Refresh the token automatically
export async function refreshToken(minValidity = 110) {
  try {
    const refreshed = await keycloak?.updateToken(minValidity);
    if (refreshed) {
      // Restart expiration tracking
      startTokenExpirationTracking();
    }
    return refreshed;
  } catch (error) {
    console.error("Token refresh failed:", error);
    logOut();
  }
}

// Log in function
export async function logIn(redirectUri = window.location.origin) {
  try {
    await keycloak?.login({ redirectUri });
  } catch (error) {
    console.error("Login failed:", error);
  }
}

// Log out function
export async function logOut(redirectUri = window.location.origin) {
  try {
    // Disconnect SignalR before logout
    try {
      const { resetSignalRClient } = await import(
        "~/composables/useSignalRClient"
      );
      resetSignalRClient();
    } catch (error) {
      console.warn("Could not reset SignalR client:", error);
    }

    // Reset the singleton
    resetSignalRClient();

    await keycloak?.logout({ redirectUri });
    isAuthenticated = false;
    stopTokenExpirationTracking();
    stopAutoTokenRefresh();

    if (typeof window !== "undefined") {
      // Clear all keys from localStorage
      localStorage.clear();

      // Clear all keys from sessionStorage
      sessionStorage.clear();
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

// Get user roles
export function getRoles(): string[] {
  return keycloak?.realmAccess?.roles || [];
}

// Get user info
export async function getUserInfo() {
  try {
    return await keycloak?.loadUserInfo();
  } catch (error) {
    console.error("Failed to load user info:", error);
    return null;
  }
}

// Start token expiration tracking (updates UI countdowns)
function startTokenExpirationTracking() {
  // Clear existing timers if any
  stopTokenExpirationTracking();

  const updateExpirationTimes = () => {
    const currentTime = Math.floor(Date.now() / 1000);

    // Access Token Expiration
    if (keycloak?.tokenParsed?.exp) {
      const accessTokenExpiresIn = keycloak.tokenParsed.exp - currentTime;
      accessTokenExpiration.value =
        accessTokenExpiresIn > 0 ? accessTokenExpiresIn : 0;

      const accessMinutes = Math.floor(accessTokenExpiration.value / 60);
      const accessSeconds = accessTokenExpiration.value % 60;
      accessTokenTimeLeft.value = `${`0${accessMinutes}`.slice(
        -2
      )}:${`0${accessSeconds}`.slice(-2)}`;
    } else {
      accessTokenExpiration.value = null;
      accessTokenTimeLeft.value = "Expired!";
    }

    // Refresh Token Expiration
    if (keycloak?.refreshToken) {
      const refreshPayload = JSON.parse(
        atob(keycloak.refreshToken?.split(".")[1] || "")
      );
      const refreshTokenExpiresIn = refreshPayload.exp - currentTime;
      refreshTokenExpiration.value =
        refreshTokenExpiresIn > 0 ? refreshTokenExpiresIn : 0;

      const refreshMinutes = Math.floor(refreshTokenExpiration.value / 60);
      const refreshSeconds = refreshTokenExpiration.value % 60;
      refreshTokenTimeLeft.value = `${`0${refreshMinutes}`.slice(
        -2
      )}:${`0${refreshSeconds}`.slice(-2)}`;

      // If refresh token is expired, log out
      if (refreshTokenExpiresIn <= 0) {
        console.error("⛔ Refresh Token expired, logging out...");
        logOut();
      }
    } else {
      refreshTokenExpiration.value = null;
      refreshTokenTimeLeft.value = "N/A";
    }
  };

  // Run immediately
  updateExpirationTimes();
  tokenCheckInterval = setInterval(updateExpirationTimes, 1000);
}

// Start auto-refreshing the Access Token
function startAutoTokenRefresh() {
  // Clear any existing intervals
  stopAutoTokenRefresh();

  autoRefreshInterval = setInterval(async () => {
    if (keycloak?.tokenParsed?.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = keycloak.tokenParsed.exp - currentTime;

      if (timeUntilExpiration < 110) {
        // Refresh token 1 minute before expiration
        console.log("🔄 Access Token is about to expire, refreshing...");
        await refreshToken();
      }
    }
  }, 1000); // Check every 30 seconds
}

// Stop tracking expiration times when logging out
function stopTokenExpirationTracking() {
  if (tokenCheckInterval) {
    clearInterval(tokenCheckInterval);
    tokenCheckInterval = null;
  }
}

// Stop auto-refresh when logging out
function stopAutoTokenRefresh() {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
    autoRefreshInterval = null;
  }
}
