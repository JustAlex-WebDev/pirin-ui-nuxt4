//
// Services
//

/**
 * Get the application info
 * @returns URL for fetching application info
 */
export function getApplicationInfo(): string {
  return `/service/info`;
}

/**
 * Get the application logo in the specified format
 * @param format The format of the logo ("svg" or "png")
 * @returns URL for fetching the app logo
 */
export function getAppLogo(format: "svg" | "png"): string {
  return `/service/logo/${format}`;
}
