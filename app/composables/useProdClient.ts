// import { useAuthClient } from "~/lib/auth-client";
import { ProdCoreClient } from "~/services/api/clients/prodCoreClient";

export const useProdClient = async () => {
  const config = useRuntimeConfig();
  // const token = useAuthClient().getToken();
  const token = "token";

  return new ProdCoreClient(config.public.PIRIN_FE_BASE_URL, token as string);
};
