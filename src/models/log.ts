export type LogStatus = 'START' | 'END';

export type TaskLevel = 'INFO' | 'WARN' | 'ERROR';

export type LogTaskTypes = {
    time: string;         // e.g., "11:35:23"
    taskName: string;     // e.g., "scheduled task 007"
    status: LogStatus;    // e.g., "START" or "END"
    taskId: string;       // e.g., "4567"
};

export type TaskTypes = {
    taskId: string;
    taskName: string;
    startTime?: string;
    endTime?: string;
    duration?: number;
    level?: TaskLevel;
};