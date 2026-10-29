import type { ChangeEventHandler } from 'react';
export interface ChecklistProps {
    progress: Record<string, number>;
    updateProgress: ChangeEventHandler<HTMLInputElement>;
}
