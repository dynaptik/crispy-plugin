import fs from 'fs';
import path from 'path';
/**
 * Saves generated artifacts and maintains the audit trail.
 * @param fileName - The 0X_ name for the artifact
 * @param content - The raw output from the agent
 */
export async function saveArtifact(fileName, content) {
    const crispyDir = path.join(process.cwd(), '.crispy');
    // 1. Ensure directory exists
    if (!fs.existsSync(crispyDir)) {
        fs.mkdirSync(crispyDir, { recursive: true });
    }
    // 2. Save the Artifact
    const filePath = path.join(crispyDir, fileName);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[HOOK] Post-Phase: Saved ${fileName}`);
    // 3. Update Audit Trail (Implementation Log)
    const logPath = path.join(crispyDir, '07_implementation.log');
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ARTIFACT_SAVED: ${fileName}\n`;
    fs.appendFileSync(logPath, logEntry, 'utf-8');
}
/**
 * Specialized hook for logging verification of a vertical slice.
 */
export async function logSliceVerification(sliceName, success, terminalOutput) {
    const logPath = path.join(process.cwd(), '.crispy', '07_implementation.log');
    const status = success ? 'PASS' : 'FAIL';
    const entry = `
--- SLICE VERIFICATION: ${sliceName} ---
Status: ${status}
Timestamp: ${new Date().toISOString()}
Output Summary: ${terminalOutput.substring(0, 100)}...
-----------------------------------------
`;
    fs.appendFileSync(logPath, entry, 'utf-8');
}
//# sourceMappingURL=post-phase.js.map