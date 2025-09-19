import type {
  AnalyticsParams,
  AnalyticsResponse,
} from "~/services/api/types/analytics";

export const useAnalytics = () => {
  //
  // State
  //
  const loading = useState<boolean>("analytics-loading", () => false);
  const error = useState<string | null>("analytics-error", () => null);
  const data = useState<AnalyticsResponse | null>("analytics-data", () => null);

  // Keep track of current request's AbortController
  let currentAbortController: AbortController | null = null;

  //
  // Methods
  //
  const fetchAnalytics = async (params?: AnalyticsParams) => {
    // Cancel previous request immediately
    if (
      currentAbortController?.signal &&
      !currentAbortController.signal.aborted
    ) {
      currentAbortController.abort();
    }

    // Create new controller
    currentAbortController = new AbortController();
    const thisController = currentAbortController;

    try {
      loading.value = true;
      error.value = null;

      // Use cached client
      const cl = await useProdClient();

      // Make request
      const response = await cl.fetchAnalyticsAggregate(
        params,
        thisController.signal
      );

      // Only update if not cancelled
      if (
        !thisController.signal.aborted &&
        currentAbortController === thisController
      ) {
        data.value = response;
        loading.value = false;
      }

      return response;
    } catch (err: any) {
      // Silently handle aborted requests
      if (err.name === "AbortError" || thisController.signal.aborted) {
        return null;
      }

      // Only show errors if this is the current request
      if (
        currentAbortController === thisController &&
        !thisController.signal.aborted
      ) {
        error.value = err.message || "Failed to fetch analytics data";
        loading.value = false;
      }

      return null;
    }
  };

  // Cleanup function
  const cleanup = () => {
    currentAbortController?.abort();
  };

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),

    // Methods
    fetchAnalytics,
    cleanup,
  };
};
