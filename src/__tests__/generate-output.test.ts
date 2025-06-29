import { describe, it, expect } from 'vitest';
import type { TaskTypes } from '../models/log';
import { generateOutput } from '../utils/generateOutput';

describe('generateOutput', () => {
  it('should format task logs into human-readable output', () => {
    const tasks: TaskTypes[] = [
      {
        taskId: '1001',
        taskName: 'task A',
        startTime: '11:00:00',
        endTime: '11:04:00',
        duration: 4,
        level: 'INFO',
      },
      {
        taskId: '1002',
        taskName: 'task B',
        startTime: '10:00:00',
        endTime: '10:07:00',
        duration: 7,
        level: 'WARN',
      },
    ];

    const output = generateOutput(tasks);

    expect(output).toContain('1001 - task A');
    expect(output).toContain('START: 11:00:00');
    expect(output).toContain('Duration: 4.00 minutes');
    expect(output).toContain('Level: INFO');

    expect(output).toContain('1002 - task B');
    expect(output).toContain('Level: WARN');
  });

  it('should handle missing values gracefully', () => {
    const tasks = [
      {
        taskId: '9999',
        taskName: 'task Z',
        level: 'ERROR',
      },
    ] as TaskTypes[]; // asserting as TaskTypes for compatibility

    const output = generateOutput(tasks);

    expect(output).toContain('9999 - task Z');
    expect(output).toContain('START: N/A');
    expect(output).toContain('END:   N/A');
    expect(output).toContain('Duration: N/A');
  });
});
