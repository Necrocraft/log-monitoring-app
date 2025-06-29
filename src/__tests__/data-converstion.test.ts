import { describe, it, expect } from 'vitest';
import { convertStringToUsableFormat } from '../utils/dataConversion';

describe('convertStringToUsableFormat', () => {
  it('should parse and calculate duration correctly', () => {
    const log = `
      11:00:00,task A, START,1001
      11:04:00,task A, END,1001
    `;

    const result = convertStringToUsableFormat(log);

    expect(result).toHaveLength(1);
    expect(result[0].taskId).toBe('1001');
    expect(result[0].duration).toBeCloseTo(4, 1);
    expect(result[0].level).toBe('INFO');
  });

  it('should warn if duration > 5 min', () => {
    const log = `
      10:00:00,task B, START,1002
      10:07:00,task B, END,1002
    `;

    const result = convertStringToUsableFormat(log);
    expect(result[0].level).toBe('WARN');
  });

  it('should error if duration > 10 min', () => {
    const log = `
      09:00:00,task C, START,1003
      09:15:00,task C, END,1003
    `;

    const result = convertStringToUsableFormat(log);
    expect(result[0].level).toBe('ERROR');
  });

  it('should handle missing END gracefully', () => {
    const log = `
      11:00:00,task D, START,1004
    `;

    const result = convertStringToUsableFormat(log);
    expect(result[0].endTime).toBeUndefined();
    expect(result[0].duration).toBeUndefined();
  });

  it('should handle tasks over midnight', () => {
    const log = `
      23:59:00,task E, START,1005
      00:04:00,task E, END,1005
    `;

    const result = convertStringToUsableFormat(log);
    expect(result[0].duration).toBeCloseTo(5, 1);
  });
});
