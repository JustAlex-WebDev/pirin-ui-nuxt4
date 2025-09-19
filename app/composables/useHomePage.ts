export const useHomePage = () => {
  //
  // Composables
  //
  const { loading, error, data, fetchAnalytics, cleanup } = useAnalytics();

  //
  // State
  //
  const dataFilter = useCookie<string>("home.dataFilter", {
    default: () => "",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: false,
  });

  const tableHeaders = [
    { title: "Дата", key: "visitDate", sortable: true },
    { title: "Общо", key: "total", sortable: true },
    { title: "Готови", key: "ready", sortable: true },
    { title: "Неготови", key: "pending", sortable: true },
    { title: "Изпратени", key: "sent", sortable: true },
    { title: "Заключени", key: "jailed", sortable: true },
  ];

  //
  // Computed Properties
  //
  const totalMetrics = computed(() => {
    const aggregated = {
      total: 0,
      ready: 0,
      pending: 0,
      sent: 0,
      jailed: 0,
    };

    if (data.value && data.value.length > 0) {
      data.value.forEach((day) => {
        aggregated.total += day.total;
        aggregated.ready += day.ready;
        aggregated.pending += day.pending;
        aggregated.sent += day.sent;
        aggregated.jailed += day.jailed;
      });
    }

    // Transform to card format
    const metrics: Record<string, number> = {
      total: aggregated.total,
      readyPending: aggregated.ready + aggregated.pending,
      sent: aggregated.sent,
    };

    // Add jailed only if > 0
    if (aggregated.jailed > 0) {
      metrics.jailed = aggregated.jailed;
    }

    return metrics;
  });

  const tableHeaderIcons = computed(() => ({
    visitDate: "mdi-calendar-outline",
    total: "mdi-chart-box-outline",
    ready: "mdi-check-circle-outline",
    pending: "mdi-clock-outline",
    sent: "mdi-email-fast-outline",
    jailed: "mdi-lock-outline",
  }));

  const tableItemFormatters = computed(() => ({
    visitDate: {
      format: (dateString: string) => {
        return new Date(dateString).toLocaleDateString("bg-BG", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
  }));

  // Transform metrics to card data for component
  const analyticsCards = computed(() => {
    if (!totalMetrics.value) return [];

    const cardConfigs = {
      total: {
        title: "Общо",
        icon: "mdi-chart-box-outline",
        backgroundColor: "grey-lighten-1",
      },
      readyPending: {
        title: "Готови (чакащи изпращане) / Неготови",
        icon: "mdi-mailbox-open-up-outline",
        backgroundColor: "info",
      },
      sent: {
        title: "Изпратени",
        icon: "mdi-email-fast-outline",
        backgroundColor: "success",
      },
      jailed: {
        title: "Заключени",
        icon: "mdi-lock-outline",
        backgroundColor: "error",
      },
    };

    return Object.entries(totalMetrics.value).map(([key, value]) => ({
      key,
      title: cardConfigs[key as keyof typeof cardConfigs]?.title || key,
      value,
      displayValue:
        key === "readyPending"
          ? `${getReadyCount()} / ${getPendingCount()}`
          : undefined,
      icon: cardConfigs[key as keyof typeof cardConfigs]?.icon || "mdi-circle",
      backgroundColor:
        cardConfigs[key as keyof typeof cardConfigs]?.backgroundColor ||
        "primary",
    }));
  });

  // Page content configuration
  const pageConfig = computed(() => {
    const today = new Date();
    const monthNames: Record<number, string> = {
      0: "яну",
      1: "фев",
      2: "мар",
      3: "апр",
      4: "май",
      5: "юни",
      6: "юли",
      7: "авг",
      8: "сеп",
      9: "окт",
      10: "ное",
      11: "дек",
    };

    const todayString = `${today.getFullYear()} ${
      monthNames[today.getMonth()]
    } ${today.getDate()}`;

    return {
      header: {
        title: "Днес",
        subtitle: todayString,
        description:
          "В следващите карти са показани статистически данни за направленията изпратени към НЗИС за днешния ден. Като изпратени се считат тези направления, чийто изследвания са завършени, а резултатите им изпратени към НЗИС.",
      },
      tableSection: {
        title: "По-стари",
        description:
          "В по-долната таблица е показана статистическа информация за предишните няколко дни. Броят на неготовите, готовите, изпратените и изпращаните с грешки (затворени).",
      },
    };
  });

  //
  // Methods
  //
  const fetchLast5Days = () => {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 5);

    return fetchAnalytics({
      startDate: startDate.toISOString().split("T")[0],
      endDate: now.toISOString().split("T")[0],
      dataFilter: dataFilter.value || undefined,
    });
  };

  // Helper methods
  const getReadyCount = (): number => {
    if (!data.value || data.value.length === 0) return 0;
    return data.value.reduce((acc, day) => acc + day.ready, 0);
  };

  const getPendingCount = (): number => {
    if (!data.value || data.value.length === 0) return 0;
    return data.value.reduce((acc, day) => acc + day.pending, 0);
  };

  const handleCardAction = (cardKey: string) => {
    // Handle different card types
    switch (cardKey) {
      case "total":
        console.log("Showing total analytics details");
        // navigateTo('/analytics/total');
        break;
      case "readyPending":
        console.log("Showing ready/pending details");
        // navigateTo('/analytics/ready-pending');
        break;
      case "sent":
        console.log("Showing sent details");
        // navigateTo('/analytics/sent');
        break;
      case "jailed":
        console.log("Showing jailed details");
        // navigateTo('/analytics/jailed');
        break;
      default:
        console.log(`Unknown card action: ${cardKey}`);
    }
  };

  //
  // Watchers
  //
  watch(dataFilter, (newValue, oldValue) => {
    // Skip initial watch trigger
    if (oldValue === undefined) {
      return;
    }

    fetchLast5Days();
  });

  // Cleanup on unmount
  onUnmounted(() => {
    cleanup();
  });

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    dataFilter,
    tableHeaders,

    // Computed Properties
    totalMetrics,
    tableHeaderIcons,
    tableItemFormatters,
    analyticsCards,
    pageConfig,

    // Methods
    fetchLast5Days,
    getReadyCount,
    getPendingCount,
    handleCardAction,
  };
};
