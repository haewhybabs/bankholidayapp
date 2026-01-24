import React from 'react';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { useRouter } from 'expo-router';
import { useHolidays } from '@/src/hooks/useHolidays';
import HomeScreen from '../(tabs)';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { mockAddToCalendar } from '@/src/hooks/__mocks__/useCalendar';

jest.mock('@/src/hooks/useHolidays');
jest.mock('@/src/hooks/useCalendar', () => require('@/src/hooks/__mocks__/useCalendar'));




const middlewares = [thunk as any];
const mockStore = configureStore(middlewares);

describe('HomeScreen', () => {
    let store: any;
    const mockPush = jest.fn();

    const mockHolidays = [
        { id: '1', title: 'Featured Holiday', date: '2026-01-01', region: 'England' },
        { id: '2', title: 'Second Holiday', date: '2026-02-01', region: 'Scotland' },
        { id: '3', title: 'Third Holiday', date: '2026-03-01', region: 'Wales' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

        // Default implementation for the data hook
        (useHolidays as jest.Mock).mockReturnValue({
            holidays: mockHolidays,
            isLoading: false,
            error: null,
            refresh: jest.fn(),
        });

        store = mockStore({
            holidays: {
                items: mockHolidays,
                isLoading: false,
                error: null
            }
        });
        store.dispatch = jest.fn();

        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    // Helper to render and bypass the 1200ms Skeleton state
    const renderWithProvider = async (state = store) => {
        const result = render(
            <Provider store={state}>
                <SafeAreaProvider>
                    <HomeScreen />
                </SafeAreaProvider>
            </Provider>
        );

        await act(async () => {
            jest.advanceTimersByTime(1500);
        });




        return result;
    };

    it('renders the featured holiday and the remainder list correctly', async () => {
        await renderWithProvider();

        // Use findBy to wait for the skeleton to disappear and content to mount
        const featuredCard = await screen.findByTestId('featured-holiday-card');
        expect(featuredCard).toBeTruthy();
        expect(screen.getByText('Featured Holiday')).toBeTruthy();

        expect(screen.getByTestId('holiday-item-2')).toBeTruthy();
        expect(screen.getByText('Scotland')).toBeTruthy();
    });

    it('navigates to edit screen when featured holiday is pressed', async () => {
        await renderWithProvider();

        const card = await screen.findByTestId('featured-holiday-card');
        fireEvent.press(card);

        expect(mockPush).toHaveBeenCalledWith('/edit/1');
    });

    it('navigates to edit screen when a list item is pressed', async () => {
        await renderWithProvider();

        const itemPressable = await screen.findByTestId('holiday-item-2-pressable');
        fireEvent.press(itemPressable);

        expect(mockPush).toHaveBeenCalledWith('/edit/2');
    });

    it('shows the delete confirmation alert when swipe-delete is triggered', async () => {
        await renderWithProvider();

        const deleteBtn = await screen.findByTestId('holiday-item-2-delete-button');
        fireEvent.press(deleteBtn);

        // Verify the CustomAlert specifically for deletion
        expect(await screen.findByTestId('delete-confirmation-alert')).toBeTruthy();
        expect(screen.getByText('Remove Holiday')).toBeTruthy();
    });

    it('dispatches deleteHoliday action when deletion is confirmed', async () => {
        await renderWithProvider();

        const deleteBtn = await screen.findByTestId('holiday-item-2-delete-button');
        fireEvent.press(deleteBtn);

        const confirmBtn = await screen.findByTestId('delete-confirmation-alert-confirm-button');
        fireEvent.press(confirmBtn);

        expect(store.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'holidays/deleteHoliday',
                payload: '2'
            })
        );
    });

    it('shows empty state when no holidays are available', async () => {
        // Override mock for this specific test
        (useHolidays as jest.Mock).mockReturnValue({
            holidays: [],
            isLoading: false,
            error: null,
            refresh: jest.fn(),
        });

        const emptyStore = mockStore({
            holidays: { items: [], isLoading: false, error: null }
        });

        await renderWithProvider(emptyStore);

        expect(await screen.findByTestId('empty-state')).toBeTruthy();
        expect(screen.getAllByText(/no holidays found/i)[0]).toBeTruthy();
    });

    it('triggers calendar sync when "Add to Calendar" is pressed', async () => {

        mockAddToCalendar.mockResolvedValue({ success: true });

        await renderWithProvider();

        const addBtn = await screen.findByTestId('holiday-item-2-add-button');
        fireEvent.press(addBtn);

        await waitFor(() => {
            expect(mockAddToCalendar).toHaveBeenCalledWith(
                'Second Holiday',
                '2026-02-01'
            );
        });
    });

    it('shows an error alert when calendar permissions are denied', async () => {
        mockAddToCalendar.mockResolvedValue({
            success: false,
            error: 'permission'
        });

        await renderWithProvider();

        const addBtn = await screen.findByTestId('holiday-item-2-add-button');
        fireEvent.press(addBtn);

        await waitFor(() => {
            expect(screen.getByText(/permission/i)).toBeTruthy();
        });
    });
});