import fs from 'fs';
import path from 'path';
/**
 * Prepares the "Clean Room" for a sub-agent.
 * @param agentName - The name of the MD file in /agents
 * @param allowedFiles - Whitelist of artifacts from .crispy/
 */
export async function runAgentPhase(agentName, allowedFiles) {
    console.log(`[HOOK] Pre-Phase: Flushing context for ${agentName}...`);
    // 1. Load the Persona (The Brain)
    const agentPath = path.join(process.cwd(), 'agents', `${agentName}.md`);
    if (!fs.existsSync(agentPath))
        throw new Error(`Agent ${agentName} not found.`);
    const systemPrompt = fs.readFileSync(agentPath, 'utf-8');
    // 2. Load the Whitelisted Context (The Memory)
    const contextMap = allowedFiles.map(fileName => {
        const filePath = path.join(process.cwd(), '.crispy', fileName);
        if (!fs.existsSync(filePath))
            return `### FILE: ${fileName}\n(Not found)`;
        const content = fs.readFileSync(filePath, 'utf-8');
        return `### FILE: ${fileName}\n${content}`;
    }).join('\n\n');
    // 3. Execution (Standardized call to the AI provider)
    // This part assumes a generic agent bridge.
    return await callAIProvider({
        system: systemPrompt,
        prompt: `Execute based on the following artifacts:\n\n${contextMap}`
    });
}
// Mock bridge to the actual AI host (Claude Code, Copilot, etc.)
async function callAIProvider(payload) {
    // Logic to send the flushed context to the LLM
    // Returns the raw generated string
    return "AI_RESPONSE_PLACEHOLDER";
}
//# sourceMappingURL=pre-phase.js.map