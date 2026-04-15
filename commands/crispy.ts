import { StateMachine } from '../index-state.js';
import { runAgentPhase } from '../hooks/pre-phase.js';
import { saveArtifact } from '../hooks/post-phase.js';

/**
 * Main entry point for the /crispy command.
 * Orchestrates Phases 1-3.
 */
export async function executeCrispy(intent: string) {
    const state = new StateMachine();
    
    // Step 0: Initial Setup
    await state.update('PHASE_Q');
    await saveArtifact('01_task.md', intent);

    // Step 1: Question Phase
    // Pre-phase hook flushes context and loads q_questioner.md
    const questions = await runAgentPhase('q_questioner', ['01_task.md']);
    await saveArtifact('02_questions.md', questions);

    // Step 2: Research Phase
    // CRITICAL: The MCP server will blind the researcher from 01_task.md
    await state.update('PHASE_R');
    const research = await runAgentPhase('r_researcher', ['02_questions.md']);
    await saveArtifact('03_research.md', research);

    // Step 3: Design Phase
    await state.update('PHASE_D');
    const design = await runAgentPhase('d_architect', ['01_task.md', '03_research.md']);
    await saveArtifact('04_design.md', design);

    return "Phases 1-3 complete. Review `.crispy/04_design.md` and run `/approve-design`.";
}