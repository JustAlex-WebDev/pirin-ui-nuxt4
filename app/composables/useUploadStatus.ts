import * as signalR from "@microsoft/signalr";

export const useUploadStatus = () => {
  //
  // State
  //
  const isConnected = ref(false);
  const nhisConnection = ref<signalR.HubConnection | null>(null);
  const patientsConnection = ref<signalR.HubConnection | null>(null);

  // Upload statuses - using useState for global state
  const nhisUploadStatus = useState(
    "nhis-upload-status",
    () => "idle" as "idle" | "progress"
  );
  const patientsUploadStatus = useState(
    "patients-upload-status",
    () => "idle" as "idle" | "progress"
  );

  // Detailed status data
  const nhisDetailedStatus = useState(
    "nhis-detailed-status",
    () => null as any
  );
  const patientsDetailedStatus = useState(
    "patients-detailed-status",
    () => null as any
  );

  // Menu state
  const uploadMenuOpen = useState("upload-menu-open", () => false);

  //
  // Computed Properties
  //
  const uploadStatusData = computed(() => ({
    nhis: {
      status: nhisUploadStatus.value,
      detailed: nhisDetailedStatus.value,
      displayText:
        nhisUploadStatus.value === "progress"
          ? "Изпращат се"
          : "Не се изпращат",
    },
    patients: {
      status: patientsUploadStatus.value,
      detailed: patientsDetailedStatus.value,
      displayText:
        patientsUploadStatus.value === "progress"
          ? "Изпращат се"
          : "Не се изпращат",
    },
    hasActiveUploads:
      nhisUploadStatus.value === "progress" ||
      patientsUploadStatus.value === "progress",
  }));

  //
  // Methods
  //
  const updateUploadStatus = (status: "idle" | "progress") => {
    nhisUploadStatus.value = status;
  };

  const updateUploadStatusDetailed = (detailedStatus: any) => {
    nhisDetailedStatus.value = detailedStatus;
  };

  const updateUploadStatusSales = (status: "idle" | "progress") => {
    patientsUploadStatus.value = status;
  };

  const updateUploadStatusSalesDetailed = (detailedStatus: any) => {
    patientsDetailedStatus.value = detailedStatus;
  };

  // Action handlers - no emits needed!
  const startNhisUpload = async () => {
    try {
      uploadMenuOpen.value = false;
      console.log("Starting NHIS upload...");

      // Make API call to start upload
      const config = useRuntimeConfig();
      await $fetch(`${config.public.PIRIN_FE_BASE_URL}/api/nhis/start-upload`, {
        method: "POST",
      });

      // Status will be updated via SignalR
    } catch (error) {
      console.error("Failed to start NHIS upload:", error);
    }
  };

  const startPatientsUpload = async () => {
    try {
      uploadMenuOpen.value = false;
      console.log("Starting patients upload...");

      // Make API call to start upload
      const config = useRuntimeConfig();
      await $fetch(
        `${config.public.PIRIN_FE_SWAGGER_URL}/api/patients/start-upload`,
        {
          method: "POST",
        }
      );

      // Status will be updated via SignalR
    } catch (error) {
      console.error("Failed to start patients upload:", error);
    }
  };

  const initSignalR = async () => {
    try {
      const config = useRuntimeConfig();
      const pirinAppBaseUrl = config.public.PIRIN_FE_SWAGGER_URL;

      // Get auth token
      const getAuthToken = () => {
        if (import.meta.client) {
          return window.localStorage.getItem("auth._id_token.keycloak") || "";
        }
        return "";
      };

      // NHIS Publishing Hub
      const nhisConnectionBuilder = new signalR.HubConnectionBuilder()
        .withUrl(`${pirinAppBaseUrl}/hubs/nhispublishing`, {
          accessTokenFactory: getAuthToken,
        })
        .withAutomaticReconnect()
        .build();

      nhisConnectionBuilder.on(
        "PUBLISHING_STATE_UPDATED",
        (currentPublishingStatus) => {
          const status = currentPublishingStatus.isRunning
            ? "progress"
            : "idle";
          updateUploadStatus(status);

          if (status === "idle") {
            updateUploadStatusDetailed(null);
          }
        }
      );

      nhisConnectionBuilder.on(
        "PUBLISHING_DETAILED_STATUS",
        (currentPublishingStatus) => {
          updateUploadStatusDetailed(currentPublishingStatus);
        }
      );

      // Patients Results Publishing Hub
      const patientsConnectionBuilder = new signalR.HubConnectionBuilder()
        .withUrl(`${pirinAppBaseUrl}/hubs/patientsresultspublishinghub`, {
          accessTokenFactory: getAuthToken,
        })
        .withAutomaticReconnect()
        .build();

      patientsConnectionBuilder.on(
        "PUBLISHING_STATE_UPDATED",
        (currentPublishingStatus) => {
          const status = currentPublishingStatus.isRunning
            ? "progress"
            : "idle";
          updateUploadStatusSales(status);

          if (status === "idle") {
            updateUploadStatusSalesDetailed(null);
          }
        }
      );

      patientsConnectionBuilder.on(
        "PUBLISHING_DETAILED_STATUS",
        (currentPublishingStatus) => {
          updateUploadStatusSalesDetailed(currentPublishingStatus);
        }
      );

      // Start connections
      await nhisConnectionBuilder.start();
      console.log("Connected to NHIS publishing hub");

      await patientsConnectionBuilder.start();
      console.log("Connected to patients results publishing hub");

      // Store connections
      nhisConnection.value = nhisConnectionBuilder;
      patientsConnection.value = patientsConnectionBuilder;
      isConnected.value = true;
    } catch (error) {
      console.error("SignalR connection error:", error);
      isConnected.value = false;
    }
  };

  const disconnectSignalR = async () => {
    try {
      if (nhisConnection.value) {
        await nhisConnection.value.stop();
        nhisConnection.value = null;
      }

      if (patientsConnection.value) {
        await patientsConnection.value.stop();
        patientsConnection.value = null;
      }

      isConnected.value = false;
      console.log("SignalR connections closed");
    } catch (error) {
      console.error("Error closing SignalR connections:", error);
    }
  };

  //
  // Lifecycle
  //
  onMounted(() => {
    if (import.meta.client) {
      initSignalR();
    }
  });

  onUnmounted(() => {
    disconnectSignalR();
  });

  return {
    // State
    isConnected,
    uploadMenuOpen,
    uploadStatusData,

    // Methods
    startNhisUpload,
    startPatientsUpload,

    // Connection methods
    initSignalR,
    disconnectSignalR,
  };
};
