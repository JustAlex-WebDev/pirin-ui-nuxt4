import type { HubConnection } from "@microsoft/signalr";

export interface ISignalRClient {
  // Connection management
  initConnections(): Promise<void>;
  disconnectAll(): Promise<void>;
  isConnected(): boolean;

  // Upload operations
  startNhisUpload(): Promise<void>;
  startPatientsUpload(): Promise<void>;

  // Event handlers
  onNhisStatusUpdate(callback: (status: any) => void): void;
  onNhisDetailedStatus(callback: (status: any) => void): void;
  onPatientsStatusUpdate(callback: (status: any) => void): void;
  onPatientsDetailedStatus(callback: (status: any) => void): void;

  // Connection getters
  getNhisConnection(): HubConnection | null;
  getPatientsConnection(): HubConnection | null;
}
