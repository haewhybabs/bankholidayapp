import { processHolidays } from '../holidayUtils';
import { GovResponse } from '@/src/types/holiday';

describe('holidayUtils - processHolidays', () => {
    const mockNow = new Date('2026-01-01T00:00:00Z');

    beforeAll(() => {
        jest.useFakeTimers().setSystemTime(mockNow);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const mockGovData: GovResponse = {
        'england-and-wales': {
            division: 'england-and-wales',
            events: [
                { title: 'New Year', date: '2026-01-01', notes: '', bunting: true },
                { title: 'Summer Holiday', date: '2026-08-01', notes: '', bunting: true }
            ]
        },
        'scotland': {
            division: 'scotland',
            events: [
                { title: 'New Year', date: '2026-01-01', notes: '', bunting: true }
            ]
        }
    };

    it('should filter out holidays further than 6 months in the future', () => {
        const result = processHolidays(mockGovData);
        const summerHoliday = result.find(h => h.title === 'Summer Holiday');
        expect(summerHoliday).toBeUndefined();
    });

    it('should aggregate regions for the same holiday date and title', () => {
        const result = processHolidays(mockGovData);
        const newYear = result.find(h => h.title === 'New Year');

        expect(newYear?.region).toContain('england & wales');
        expect(newYear?.region).toContain('scotland');
    });

    it('should limit the result to a maximum of 5 holidays', () => {
        const manyEvents = Array.from({ length: 10 }, (_, i) => ({
            title: `Holiday ${i}`,
            date: `2026-02-0${i + 1}`,
            notes: '',
            bunting: true
        }));

        const largeMockData: GovResponse = {
            'england-and-wales': { division: 'england-and-wales', events: manyEvents }
        };

        const result = processHolidays(largeMockData);
        expect(result.length).toBe(5);
    });
});