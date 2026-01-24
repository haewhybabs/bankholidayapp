
export const mockAddToCalendar = jest.fn();

export const useCalendar = () => ({
    addToCalendar: mockAddToCalendar,
});