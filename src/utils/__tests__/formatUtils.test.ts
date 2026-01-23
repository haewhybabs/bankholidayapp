import { formatHolidayDate } from '../formatUtils';

describe('formatUtils', () => {
    describe('formatHolidayDate', () => {
        it('should format a valid date string correctly for en-GB', () => {
            const input = '2026-12-25';
            const result = formatHolidayDate(input);

            expect(result).toMatch(/Fri,?\s25\sDec\s2026/);
        });

        it('should return an empty string when provided an empty input', () => {
            expect(formatHolidayDate('')).toBe('');
        });

        it('should return the original string if the date is invalid', () => {
            const invalid = 'not-a-real-date';
            expect(formatHolidayDate(invalid)).toBe(invalid);
        });
    });
});