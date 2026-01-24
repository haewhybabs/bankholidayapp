export const useHolidays = jest.fn(() => ({
    holidays: [],
    isLoading: false,
    error: null,
    refresh: jest.fn(),
}));