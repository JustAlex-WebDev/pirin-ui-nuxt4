export const useUploadStatus = () => {
  //
  // UI State Only (no SignalR logic)
  //
  const nhisUploadStatus = useState(
    "nhis-upload-status",
    () => "idle" as "idle" | "progress"
  );
  const patientsUploadStatus = useState(
    "patients-upload-status",
    () => "idle" as "idle" | "progress"
  );
  const nhisDetailedStatus = useState(
    "nhis-detailed-status",
    () => null as any
  );
  const patientsDetailedStatus = useState(
    "patients-detailed-status",
    () => null as any
  );
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
  // State Update Methods (for SignalR events)
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

  //
  // Action Methods (delegate to SignalR)
  //
  const startNhisUpload = async () => {
    try {
      uploadMenuOpen.value = false;
      const { startNhisUpload: signalRStartNhis } = useSignalR();
      await signalRStartNhis();
    } catch (error) {
      console.error("Failed to start NHIS upload:", error);
    }
  };

  const startPatientsUpload = async () => {
    try {
      uploadMenuOpen.value = false;
      const { startPatientsUpload: signalRStartPatients } = useSignalR();
      await signalRStartPatients();
    } catch (error) {
      console.error("Failed to start patients upload:", error);
    }
  };

  return {
    // UI State
    uploadMenuOpen,
    uploadStatusData,

    // Actions
    startNhisUpload,
    startPatientsUpload,

    // State updaters (for SignalR event handlers)
    updateUploadStatus,
    updateUploadStatusDetailed,
    updateUploadStatusSales,
    updateUploadStatusSalesDetailed,
  };
};
