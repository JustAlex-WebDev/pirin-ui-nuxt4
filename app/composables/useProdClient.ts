import { useAuthClient } from "~/lib/auth-client";
import { ProdCoreClient } from "~/services/api/clients/prodCoreClient";

// Cache the client instance
let cachedClient: ProdCoreClient | null = null;
let cachedToken: string | null = null;

export const useProdClient = async () => {
  const config = useRuntimeConfig();
  const currentToken = useAuthClient().getToken();

  // Only create new client if token changed
  if (!cachedClient || cachedToken !== currentToken) {
    cachedClient = new ProdCoreClient(
      config.public.API_BASE_URL,
      currentToken as string
    );
    cachedToken = currentToken;
  }

  return cachedClient;
};
