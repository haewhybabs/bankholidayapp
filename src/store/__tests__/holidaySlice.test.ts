import holidayReducer, { updateHoliday, deleteHoliday, fetchHolidays } from '../holidaySlice';
import { Holiday } from '../../types/holiday';

describe('holidaySlice', () => {
    // Helper to create a valid Holiday object without repeating code
    const createMockHoliday = (overrides: Partial<Holiday>): Holiday => ({
        id: 'default-id',
        title: 'Default Holiday',
        date: '2026-01-01',
        notes: '',
        bunting: true,
        region: 'UK',
        ...overrides
    });

    const mockHoliday = createMockHoliday({ id: '1-xmas', title: 'Christmas' });

    const initialState = {
        items: [mockHoliday],
        status: 'idle' as const,
        error: null,
    };

    describe('Reducers', () => {
        it('should handle updateHoliday by finding the correct ID', () => {
            const updated = createMockHoliday({ id: '1-xmas', title: 'Xmas Day' });
            const state = holidayReducer(initialState, updateHoliday(updated));

            expect(state.items[0].title).toBe('Xmas Day');
            // Ensure properties like bunting were preserved
            expect(state.items[0].bunting).toBe(true);
        });

        it('should handle deleteHoliday', () => {
            const state = holidayReducer(initialState, deleteHoliday('1-xmas'));
            expect(state.items).toHaveLength(0);
        });
    });

    describe('Extra Reducers (Async Thunk)', () => {
        it('should populate items and set succeeded when fetchHolidays is fulfilled', () => {
            const mockData: Holiday[] = [
                createMockHoliday({ id: '2-newyear', title: 'New Year' })
            ];
            const action = { type: fetchHolidays.fulfilled.type, payload: mockData };

            const state = holidayReducer(initialState, action);

            expect(state.status).toBe('succeeded');
            expect(state.items).toEqual(mockData);
        });
        it('should set error message when fetchHolidays is rejected', () => {
            const action = {
                type: fetchHolidays.rejected.type,
                error: { message: 'Network failed' }
            };

            const state = holidayReducer(initialState, action);

            expect(state.status).toBe('failed');
            expect(state.error).toBe('Network failed');
        });
    });
});