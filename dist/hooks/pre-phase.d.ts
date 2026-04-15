/**
 * Prepares the "Clean Room" for a sub-agent.
 * @param agentName - The name of the MD file in /agents
 * @param allowedFiles - Whitelist of artifacts from .crispy/
 */
export declare function runAgentPhase(agentName: string, allowedFiles: string[]): Promise<string>;
