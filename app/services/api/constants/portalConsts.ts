//
// Analytics
//

/**
 * Get analytics aggregate data
 */
export function getAnalyticsAggregate(): string {
  return `/analytics/aggregate`;
}

//
// Services
//

/**
 * Get the application info
 */
export function getApplicationInfo(): string {
  return `/service/info`;
}

/**
 * Get the application logo in the specified format
 * @param format The format of the logo ("svg" or "png")
 */
export function getAppLogo(format: "svg" | "png"): string {
  return `/service/logo/${format}`;
}
