/**
 * Saves generated artifacts and maintains the audit trail.
 * @param fileName - The 0X_ name for the artifact
 * @param content - The raw output from the agent
 */
export declare function saveArtifact(fileName: string, content: string): Promise<void>;
/**
 * Specialized hook for logging verification of a vertical slice.
 */
export declare function logSliceVerification(sliceName: string, success: boolean, terminalOutput: string): Promise<void>;
