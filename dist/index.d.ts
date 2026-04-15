/**
 * CRISPY ORCHESTRATOR ENTRY POINT
 * This function is registered as the "Skill" handler in .plugin.json
 */
export declare function onPluginCommand(command: string, args: any): Promise<string>;
/**
 * Lifecycle Hook: Session Start
 * Ensures the .crispy/ directory and state.json are ready.
 */
export declare function onSessionStart(): Promise<void>;
