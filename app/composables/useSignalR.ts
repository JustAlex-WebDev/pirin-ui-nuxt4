import { resetSignalRClient, useSignalRClient } from "./useSignalRClient";

export const useSignalR = () => {
  // Move useState calls inside the composable function
  const isConnected = useState("signalr.isConnected", () => false);
  const isInitializing = useState("signalr.isInitializing", () => false);
  const isEventHandlersSetup = useState(
    "signalr.eventHandlersSetup",
    () => false
  );

  // Get singleton client
  const client = useSignalRClient();

  //
  // Methods
  //
  const init = async () => {
    if (isInitializing.value || isConnected.value) {
      console.log("SignalR already initializing or connected");
      return;
    }

    try {
      isInitializing.value = true;
      console.log("Initializing SignalR connections...");

      // Setup event handlers only once
      if (!isEventHandlersSetup.value) {
        setupEventHandlers();
        isEventHandlersSetup.value = true;
      }

      // Initialize connections
      await client.initConnections();
      isConnected.value = client.isConnected();

      console.log("SignalR connections initialized successfully");
    } catch (error) {
      console.error("SignalR initialization error:", error);
      isConnected.value = false;
      throw error;
    } finally {
      isInitializing.value = false;
    }
  };

  const disconnect = async () => {
    try {
      console.log("Disconnecting SignalR...");
      await client.disconnectAll();
      isConnected.value = false;
      isEventHandlersSetup.value = false;
      resetSignalRClient();
      console.log("SignalR disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting SignalR:", error);
      throw error;
    }
  };

  const setupEventHandlers = () => {
    // Get upload status composable for event handling
    const {
      updateUploadStatus,
      updateUploadStatusDetailed,
      updateUploadStatusSales,
      updateUploadStatusSalesDetailed,
    } = useUploadStatus();

    // NHIS events
    client.onNhisStatusUpdate((status: any) => {
      const uploadStatus = status.isRunning ? "progress" : "idle";
      updateUploadStatus(uploadStatus);
      if (uploadStatus === "idle") {
        updateUploadStatusDetailed(null);
      }
    });

    client.onNhisDetailedStatus((status: any) => {
      updateUploadStatusDetailed(status);
    });

    // Patients events
    client.onPatientsStatusUpdate((status: any) => {
      const uploadStatus = status.isRunning ? "progress" : "idle";
      updateUploadStatusSales(uploadStatus);
      if (uploadStatus === "idle") {
        updateUploadStatusSalesDetailed(null);
      }
    });

    client.onPatientsDetailedStatus((status: any) => {
      updateUploadStatusSalesDetailed(status);
    });
  };

  // Upload operations (delegated to client)
  const startNhisUpload = () => client.startNhisUpload();
  const startPatientsUpload = () => client.startPatientsUpload();

  return {
    // State
    isConnected: readonly(isConnected),
    isInitializing: readonly(isInitializing),

    // Methods
    init,
    disconnect,
    startNhisUpload,
    startPatientsUpload,

    // Client access (if needed)
    getClient: () => client,
  };
};
