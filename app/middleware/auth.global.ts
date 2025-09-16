export default defineNuxtRouteMiddleware(async (to) => {
  // Skip auth check on server side for better performance
  if (import.meta.server) return;

  // Skip auth check for login page
  if (to.path === "/login") return;

  // Only run on protected routes (or default to true for all pages except login)
  const requiresAuth = to.meta.requiresAuth !== false;
  if (!requiresAuth) return;

  const { init, isAuthenticated } = useAuth();

  try {
    // Initialize auth with better error handling
    await init("check-sso");

    // Redirect to login if not authenticated
    if (!isAuthenticated.value) {
      return await navigateTo("/login", { replace: true });
    }
  } catch (error) {
    console.error("Auth middleware failed:", error);
    // Redirect to login page on auth errors
    return await navigateTo("/login", { replace: true });
  }
});
