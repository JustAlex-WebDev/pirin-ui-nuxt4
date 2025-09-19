import * as consts from "../constants/portalConsts";
import type { AnalyticsParams, AnalyticsResponse } from "../types/analytics";
import type { IPortalClient } from "./iPortalClient";

export class ProdCoreClient implements IPortalClient {
  private baseUrl: string;
  private token: string | null;

  constructor(baseUrl: string, token: string | null) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  //
  // Analytics
  //
  public async fetchAnalyticsAggregate(
    params?: AnalyticsParams,
    signal?: AbortSignal | null
  ): Promise<AnalyticsResponse> {
    return this.get<AnalyticsResponse>(consts.getAnalyticsAggregate(), {
      params,
      signal,
    });
  }

  //
  // Services
  //
  public async fetchAppInfo(signal: AbortSignal | null): Promise<string> {
    return this.get<string>(consts.getApplicationInfo(), { signal });
  }

  public async fetchAppLogo(
    format: "svg" | "png",
    signal: AbortSignal | null
  ): Promise<string> {
    const response = await this.getRaw(consts.getAppLogo(format), { signal });
    const blob = await response.blob();
    return this.blobToBase64(blob);
  }

  //
  // Generic HTTP Methods
  //
  private async get<T>(
    endpoint: string,
    options: {
      params?: Record<string, any>;
      signal?: AbortSignal | null;
    } = {}
  ): Promise<T> {
    return $fetch<T>(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      query: this.buildQuery(options.params),
      signal: options.signal || undefined,
      headers: this.getHeaders(),
    });
  }

  private async getRaw(
    endpoint: string,
    options: {
      params?: Record<string, any>;
      signal?: AbortSignal | null;
    } = {}
  ): Promise<Response> {
    return fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      signal: options.signal || undefined,
      headers: this.getHeaders(),
    });
  }

  private async post<T>(
    endpoint: string,
    options: {
      body?: any;
      params?: Record<string, any>;
      signal?: AbortSignal | null;
    } = {}
  ): Promise<T> {
    return $fetch<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: options.body,
      query: this.buildQuery(options.params),
      signal: options.signal || undefined,
      headers: this.getHeaders(),
    });
  }

  //
  // Helper Methods
  //
  private buildQuery(params?: Record<string, any>): Record<string, string> {
    if (!params) return {};

    const query: Record<string, string> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query[key] = String(value);
      }
    });

    return query;
  }

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
