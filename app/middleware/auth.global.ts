export default defineNuxtRouteMiddleware(async (to) => {
  // Only run on protected routes
  if (!to.meta.requiresAuth) return;

  const { init, login, isAuthenticated } = useAuth();

  // Initialize auth
  await init("check-sso");

  // Redirect to login if not authenticated
  if (!isAuthenticated.value && import.meta.client) {
    await login(window.location.origin + to.fullPath);
  }
});
