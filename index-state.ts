import fs from 'fs';
import path from 'path';

export class StateMachine {
    private statePath = path.join(process.cwd(), '.crispy', 'state.json');

    /**
     * Reads the current phase from the persistent state file.
     */
    getCurrentState(): string {
        try {
            if (!fs.existsSync(this.statePath)) {
                return 'INIT';
            }
            const data = JSON.parse(fs.readFileSync(this.statePath, 'utf-8'));
            return data.currentPhase || 'INIT';
        } catch (error) {
            console.error("[CRISPY] Error reading state.json, defaulting to INIT");
            return 'INIT';
        }
    }

    /**
     * Updates the persistent state file.
     */
    async update(phase: string): Promise<void> {
        const crispyDir = path.dirname(this.statePath);
        if (!fs.existsSync(crispyDir)) {
            fs.mkdirSync(crispyDir, { recursive: true });
        }

        const data = {
            currentPhase: phase,
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(this.statePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`[CRISPY STATE] Phase changed to: ${phase}`);
    }
}