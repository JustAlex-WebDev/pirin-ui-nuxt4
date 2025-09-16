//
// SignalR Hub Constants
//

/**
 * Get the NHIS publishing hub URL
 * @returns Hub URL for NHIS publishing
 */
export function getNhisPublishingHub(): string {
  return `/hubs/nhispublishing`;
}

/**
 * Get the patients results publishing hub URL
 * @returns Hub URL for patients results publishing
 */
export function getPatientsResultsPublishingHub(): string {
  return `/hubs/patientsresultspublishinghub`;
}

//
// API Endpoints
//

/**
 * Get the NHIS upload start endpoint
 * @returns API endpoint for starting NHIS upload
 */
export function getNhisStartUpload(): string {
  return `/nhis/start-upload`;
}

/**
 * Get the patients upload start endpoint
 * @returns API endpoint for starting patients upload
 */
export function getPatientsStartUpload(): string {
  return `/patients/start-upload`;
}
