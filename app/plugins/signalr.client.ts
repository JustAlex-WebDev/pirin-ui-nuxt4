export default defineNuxtPlugin(async () => {
  // Only run on client side
  if (!import.meta.client) return;

  const { init: initAuth, isAuthenticated } = useAuth();
  const { init: initSignalR } = useSignalR();

  // Initialize auth first
  await initAuth().catch(console.error);

  // Initialize SignalR if authenticated
  if (isAuthenticated.value) {
    await initSignalR().catch(console.error);
  }

  // Cleanup on page unload
  window.addEventListener("beforeunload", async () => {
    const { disconnect } = useSignalR();
    await disconnect().catch(console.error);
  });
});
