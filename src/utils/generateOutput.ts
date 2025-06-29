import type { TaskTypes } from "../models/log";

// Output Format -
// 37981 - scheduled task 033
// START: 10:20:00
// END:   10:31:30
// Duration: 11.50 minutes
// Level: ERROR

export const generateOutput = (tasks: TaskTypes[]) => {
    const logs: string[] = [];

    tasks.forEach((task) => {
        // Log can be incomplete without Start or End so we check the fields or add N/A
        const duration = task.duration?.toFixed(2) ?? 'N/A';
        const start = task.startTime ?? 'N/A';
        const end = task.endTime ?? 'N/A';
        const level = task.level ?? 'INFO';

        logs.push(`${task.taskId} - ${task.taskName}`);
        logs.push(`  START: ${start}`);
        logs.push(`  END:   ${end}`);
        logs.push(`  Duration: ${duration} minutes`);
        logs.push(`  Level: ${level}`);
        logs.push(''); // empty line between entries
    });

    return logs.join('\n');
}
