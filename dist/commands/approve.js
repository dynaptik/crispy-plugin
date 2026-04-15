import { StateMachine } from '../index-state.js';
import { runAgentPhase } from '../hooks/pre-phase.js';
import { saveArtifact } from '../hooks/post-phase.js';
/**
 * Handles the /approve-design command.
 * Orchestrates Phases 4-5 and prepares for Phase 7.
 */
export async function executeApprove() {
    const state = new StateMachine();
    if (state.getCurrentState() !== 'PHASE_D') {
        throw new Error("Action Denied: You must complete the Design phase before approving.");
    }
    // Phase 4: Structure
    await state.update('PHASE_S');
    const structure = await runAgentPhase('s_structurer', ['04_design.md']);
    await saveArtifact('05_structure.md', structure);
    // Phase 5: Planning
    await state.update('PHASE_P');
    const plan = await runAgentPhase('p_planner', ['05_structure.md']);
    await saveArtifact('06_plan.md', plan);
    // Phase 6: Worktree Initialization
    // We signal the MCP server to create a Git Worktree here
    await state.update('PHASE_I');
    return "Design approved. Vertical slices mapped. Initializing implementation loop...";
}
//# sourceMappingURL=approve.js.map