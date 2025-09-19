/**
 * Parameters for fetching aggregated analytics data.
 * @property {string} [month] - Optional filter by month (format: YYYY-MM).
 * @property {string} [startDate] - Optional start of date range (format: YYYY-MM-DD).
 * @property {string} [endDate] - Optional end of date range (format: YYYY-MM-DD).
 * @property {string} [dataFilter] - Optional backend filter. Allowed values: 'referrals', 'sales', or ''.
 */
export interface AnalyticsParams {
  month?: string;
  startDate?: string;
  endDate?: string;
  dataFilter?: string;
}

/**
 * Represents an array of daily aggregated analytics metrics.
 * @property {string} visitDate - ISO 8601 date string for the metrics (e.g. "2025-06-05T00:00:00").
 * @property {number} total - Total number of visits/transactions recorded.
 * @property {number} ready - Number of items marked “ready” on this date.
 * @property {number} pending - Number of items still pending processing.
 * @property {number} sent - Number of items successfully sent.
 * @property {number} jailed - Number of items held/jail-flagged for review.
 */
export interface AnalyticsResponse
  extends Array<{
    visitDate: string;
    total: number;
    ready: number;
    pending: number;
    sent: number;
    jailed: number;
  }> {}
