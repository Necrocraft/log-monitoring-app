import type { LogStatus, LogTaskTypes, TaskTypes } from '../models/log';

export const convertStringToUsableFormat = (logText: string): TaskTypes[] => {
  // Trim and create an array of all new lines in the string
  const lines = logText.trim().split('\n');

  const parsedLines: LogTaskTypes[] = lines.map(line => {
    // Split each line by comma and trim whitespace and get the data in destructured format
    const [time, taskName, status, taskId] = line.split(',').map(s => s.trim());
    return { time, taskName, status: status as LogStatus, taskId };
  });

  // Create a map to hold tasks by taskId and add all the required fields and to remove duplicates
  // If a taskId already exists, it will not be added again
  // This ensures that we only keep the latest START and END times for each taskId
  // Also, we will calculate the duration and level of each task based on the start and end times
  const taskMap: Record<string, TaskTypes> = {};

  parsedLines.forEach(({ time, taskName, status, taskId }) => {
    if (!taskMap[taskId]) {
      taskMap[taskId] = { taskId, taskName };
    }

    if (status === 'START') {
      taskMap[taskId].startTime = time;
    } else if (status === 'END') {
      taskMap[taskId].endTime = time;
    }
  });

  // Now we will calculate the duration and level for each task
  // Duration is calculated as the difference between endTime and startTime in minutes
  // Level is determined based on the duration:
  // Finally, we will return an array of TaskTypes with all the calculated fields
  const result: TaskTypes[] = [];

  Object.values(taskMap).forEach(task => {
    if (task.startTime && task.endTime) {
      // Parse time strings into Date objects
      const today = new Date().toISOString().split('T')[0]; // Use today's date
      const start = new Date(`${today}T${task.startTime}`);
      const end = new Date(`${today}T${task.endTime}`);

      let duration = (end.getTime() - start.getTime()) / 1000 / 60; // in minutes

      // If the end time is earlier than the start time, it means the task crossed midnight
      if (duration < 0) {
        duration += 24 * 60;
      }

      task.duration = duration;

      if (duration > 10) {
        task.level = 'ERROR';
      } else if (duration > 5) {
        task.level = 'WARN';
      } else {
        task.level = 'INFO';
      }
    } else {
      console.warn(`WARNING: Task ${task.taskId} has incomplete timing data`);
    }

    result.push(task);
  });

  return result;
}
