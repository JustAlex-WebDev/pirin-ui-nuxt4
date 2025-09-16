import * as signalR from "@microsoft/signalr";
import * as consts from "../constants/signalRConsts";
import type { ISignalRClient } from "./ISignalRClient";

export class SignalRClient implements ISignalRClient {
  private baseUrl: string;
  private getToken: () => string | null;
  private nhisConnection: signalR.HubConnection | null = null;
  private patientsConnection: signalR.HubConnection | null = null;
  private _isConnected: boolean = false;

  constructor(baseUrl: string, getToken: () => string | null) {
    this.baseUrl = baseUrl;
    this.getToken = getToken;
  }

  //
  // Connection Management
  //

  async initConnections(): Promise<void> {
    try {
      await Promise.all([
        this.initNhisConnection(),
        this.initPatientsConnection(),
      ]);
      this._isConnected = true;
    } catch (error) {
      console.error("SignalR connection error:", error);
      this._isConnected = false;
      throw error;
    }
  }

  async disconnectAll(): Promise<void> {
    try {
      const disconnectPromises = [];

      if (this.nhisConnection) {
        disconnectPromises.push(this.nhisConnection.stop());
      }

      if (this.patientsConnection) {
        disconnectPromises.push(this.patientsConnection.stop());
      }

      await Promise.all(disconnectPromises);

      this.nhisConnection = null;
      this.patientsConnection = null;
      this._isConnected = false;
    } catch (error) {
      console.error("Error closing SignalR connections:", error);
      throw error;
    }
  }

  isConnected(): boolean {
    return this._isConnected;
  }

  //
  // Upload Operations
  //

  async startNhisUpload(): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token available");
    }

    const uploadUrl = `${this.baseUrl}${consts.getNhisStartUpload()}`;
    await $fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async startPatientsUpload(): Promise<void> {
    const token = this.getToken();
    if (!token) {
      throw new Error("No authentication token available");
    }

    const uploadUrl = `${this.baseUrl}${consts.getPatientsStartUpload()}`;
    await $fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  //
  // Event Handlers
  //

  onNhisStatusUpdate(callback: (status: any) => void): void {
    this.nhisConnection?.on("PUBLISHING_STATE_UPDATED", callback);
  }

  onNhisDetailedStatus(callback: (status: any) => void): void {
    this.nhisConnection?.on("PUBLISHING_DETAILED_STATUS", callback);
  }

  onPatientsStatusUpdate(callback: (status: any) => void): void {
    this.patientsConnection?.on("PUBLISHING_STATE_UPDATED", callback);
  }

  onPatientsDetailedStatus(callback: (status: any) => void): void {
    this.patientsConnection?.on("PUBLISHING_DETAILED_STATUS", callback);
  }

  //
  // Connection Getters
  //

  getNhisConnection(): signalR.HubConnection | null {
    return this.nhisConnection;
  }

  getPatientsConnection(): signalR.HubConnection | null {
    return this.patientsConnection;
  }

  //
  // Private Methods
  //

  private async initNhisConnection(): Promise<void> {
    const hubUrl = `${this.baseUrl}${consts.getNhisPublishingHub()}`;

    this.nhisConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: async () => this.getToken() || "",
      })
      .withAutomaticReconnect()
      .build();

    await this.nhisConnection.start();
  }

  private async initPatientsConnection(): Promise<void> {
    const hubUrl = `${this.baseUrl}${consts.getPatientsResultsPublishingHub()}`;

    this.patientsConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: async () => this.getToken() || "",
      })
      .withAutomaticReconnect()
      .build();

    await this.patientsConnection.start();
  }
}
