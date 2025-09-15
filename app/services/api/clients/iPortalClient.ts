export interface IPortalClient {
  //
  // Services
  //

  // Application info
  fetchAppInfo(ac: AbortSignal | null): Promise<string>;

  // Application logo
  fetchAppLogo(format: "svg" | "png", ac: AbortSignal | null): Promise<string>;
}
