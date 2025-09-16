import { useAuthClient } from "~/lib/auth-client";
import { ProdCoreClient } from "~/services/api/clients/prodCoreClient";

export const useProdClient = async () => {
  const config = useRuntimeConfig();
  const token = useAuthClient().getToken();

  return new ProdCoreClient(config.public.API_BASE_URL, token as string);
};
