export declare class StateMachine {
    private statePath;
    /**
     * Reads the current phase from the persistent state file.
     */
    getCurrentState(): string;
    /**
     * Updates the persistent state file.
     */
    update(phase: string): Promise<void>;
}
