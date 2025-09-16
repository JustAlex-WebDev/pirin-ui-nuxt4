import { SignalRClient } from "~/services/api/clients/signalRClient";
import { useAuthClient } from "~/lib/auth-client";
import type { ISignalRClient } from "~/services/api/clients/ISignalRClient";

// Global singleton instance
let signalRClientInstance: ISignalRClient | null = null;

export const useSignalRClient = (): ISignalRClient => {
  // If we already have an instance, return it
  if (signalRClientInstance) {
    return signalRClientInstance;
  }

  // Create new instance only if none exists
  const config = useRuntimeConfig();
  const { getToken } = useAuthClient();

  signalRClientInstance = new SignalRClient(
    config.public.APP_BASE_URL,
    getToken
  );

  return signalRClientInstance;
};

// Helper function to reset the singleton (useful for logout)
export const resetSignalRClient = () => {
  signalRClientInstance = null;
};
