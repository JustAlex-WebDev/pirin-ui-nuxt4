import * as consts from "../constants/portalConsts";
import type { IPortalClient } from "./iPortalClient";

export class ProdCoreClient implements IPortalClient {
  private baseUrl: string;
  private token: string | null;

  // Constructor to initialize base URL and token
  constructor(baseUrl: string, token: string | null) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  //
  // Services
  //

  // Fetches application info
  public async fetchAppInfo(ac: AbortSignal | null): Promise<string> {
    const fetchUrl = `${this.baseUrl}${consts.getApplicationInfo()}`;
    const data = await $fetch(fetchUrl, {
      signal: ac,
      headers: { Authorization: `Bearer ${this.token}` },
    });
    return data as string;
  }

  // Fetches application logo in a specified format
  public async fetchAppLogo(
    format: "svg" | "png",
    ac: AbortSignal | null
  ): Promise<string> {
    const fetchUrl = `${this.baseUrl}${consts.getAppLogo(format)}`;
    const response = await fetch(fetchUrl, {
      signal: ac,
      headers: { Authorization: `Bearer ${this.token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch the app logo");
    }

    // Convert Blob to Base64 string
    const blob = await response.blob();
    return await this.blobToBase64(blob);
  }

  // Helper method to convert Blob to Base64
  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;

      // Converts to Base64
      reader.readAsDataURL(blob);
    });
  }
}
