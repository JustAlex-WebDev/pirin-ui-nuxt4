import type { AnalyticsParams, AnalyticsResponse } from "../types/analytics";

export interface IPortalClient {
  //
  // Analytics
  //

  // Analytics aggregate data
  fetchAnalyticsAggregate(
    params?: AnalyticsParams,
    ac?: AbortSignal | null
  ): Promise<AnalyticsResponse>;

  //
  // Services
  //

  // Application info
  fetchAppInfo(ac: AbortSignal | null): Promise<string>;

  // Application logo
  fetchAppLogo(format: "svg" | "png", ac: AbortSignal | null): Promise<string>;
}
