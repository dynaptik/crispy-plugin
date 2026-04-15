import fs from 'fs';
import { StateMachine } from '../index-state.js';

export async function executeStatus() {
    const state = new StateMachine();
    const current = state.getCurrentState();
    
    const artifacts = [
        { file: '01_task.md', label: 'Input Task' },
        { file: '02_questions.md', label: 'Questions' },
        { file: '03_research.md', label: 'Research' },
        { file: '04_design.md', label: 'Design' },
        { file: '05_structure.md', label: 'Vertical Slices' },
        { file: '06_plan.md', label: 'Tactical Plan' }
    ];

    const trail = artifacts.map(a => {
        const exists = fs.existsSync(`.crispy/${a.file}`);
        return `${exists ? '✅' : '⬜'} ${a.label} (${a.file})`;
    }).join('\n');

    return `## CRISPY Status: ${current}\n\n${trail}`;
}