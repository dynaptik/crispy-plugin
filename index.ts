import { executeCrispy } from './commands/crispy.js';
import { executeApprove } from './commands/approve.js';
import { executeStatus } from './commands/status.js';
import { executeResume } from './commands/resume.js';
import { StateMachine } from './index-state.js'; // Renamed to avoid collision

/**
 * CRISPY ORCHESTRATOR ENTRY POINT
 * This function is registered as the "Skill" handler in .plugin.json
 */
export async function onPluginCommand(command: string, args: any) {
  const state = new StateMachine();
  
  console.log(`[CRISPY] Received command: /${command}`);

  try {
    switch (command) {
      case 'crispy':
        // Usage: /crispy "Implement rate limiting"
        return await executeCrispy(args.intent || args.prompt);

      case 'approve-design':
        // Usage: /approve-design
        return await executeApprove();

      case 'crispy-status':
        // Usage: /crispy-status
        return await executeStatus();

      case 'crispy-resume':
        // Usage: /crispy-resume
        return await executeResume();

      default:
        return `Unknown CRISPY command: /${command}. Available: /crispy, /approve-design, /crispy-status, /crispy-resume.`;
    }
  } catch (error: any) {
    console.error(`[CRISPY ERROR] ${error.message}`);
    return `❌ CRISPY Error: ${error.message}`;
  }
}

/**
 * Lifecycle Hook: Session Start
 * Ensures the .crispy/ directory and state.json are ready.
 */
export async function onSessionStart() {
  const state = new StateMachine();
  if (state.getCurrentState() === 'INIT') {
    console.log("CRISPY Engine ready. Use /crispy to begin.");
  }
}