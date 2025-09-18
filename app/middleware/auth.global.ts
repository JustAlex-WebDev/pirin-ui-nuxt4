export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip auth check on server side for better performance
  if (import.meta.server) return;

  // Skip auth check for login page
  if (to.path === "/login") return;

  // Only run on protected routes (or default to true for all pages except login)
  const requiresAuth = to.meta.requiresAuth !== false;
  if (!requiresAuth) return;

  const { init, isAuthenticated, isPirinAdmin } = useAuth();

  try {
    // Initialize auth with better error handling
    await init("check-sso");

    // Redirect to login if not authenticated
    if (!isAuthenticated.value) {
      return await navigateTo("/login", { replace: true });
    }

    // Check for admin-only routes
    if (to.meta.adminRequired && !isPirinAdmin.value) {
      // Store the attempted route for potential future use
      if (import.meta.client) {
        sessionStorage.setItem("attempted_admin_route", to.path);
      }

      // Determine where to redirect back to
      const redirectPath = getRedirectPath(from, to);

      // Add query parameter to show error message on the destination page
      const redirectUrl =
        redirectPath === "/"
          ? "/?error=insufficient_permissions"
          : `${redirectPath}?error=insufficient_permissions`;

      return await navigateTo(redirectUrl, { replace: true });
    }
  } catch (error) {
    console.error("Auth middleware failed:", error);
    // Redirect to login page on auth errors
    return await navigateTo("/login", { replace: true });
  }
});

/**
 * Determines the best redirect path when user lacks admin permissions
 */
function getRedirectPath(from: any, to: any): string {
  // List of valid pages to redirect back to (exclude admin pages)
  const validRedirectPages = [
    "/",
    "/calendar",
    "/exceptions",
    "/upload-sessions",
  ];

  // If coming from a valid previous page that's not an admin page
  if (
    from?.path &&
    from.path !== to.path &&
    from.path !== "/login" &&
    validRedirectPages.includes(from.path)
  ) {
    return from.path;
  }

  // If no valid previous page, go to home
  return "/";
}
