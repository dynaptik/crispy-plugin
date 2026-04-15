import { StateMachine } from '../index-state.js';
import { executeCrispy } from './crispy.js';
import { executeApprove } from './approve.js';

export async function executeResume() {
    const state = new StateMachine();
    const current = state.getCurrentState();

    switch (current) {
        case 'PHASE_Q':
        case 'PHASE_R':
        case 'PHASE_D':
            // Logic to re-run from the last failed point in the intake cycle
            return "Resuming Intake cycle...";
        case 'PHASE_S':
        case 'PHASE_P':
            return executeApprove();
        case 'PHASE_I':
            return "Resuming Implementation: Accessing Git Worktree...";
        default:
            return "No active CRISPY session found to resume.";
    }
}