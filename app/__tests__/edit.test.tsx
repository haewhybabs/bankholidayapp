import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditHolidayScreen from '../edit/[id]';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Mock expo-router
jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
    useLocalSearchParams: jest.fn(),
}));

const mockStore = configureStore([]);

describe('EditHolidayScreen', () => {
    let store: any;
    const mockBack = jest.fn();

    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();

        store = mockStore({
            holidays: {
                items: [
                    {
                        id: '1',
                        title: 'Test Holiday',
                        date: '2026-01-01',
                        notes: '',
                        bunting: true,
                        region: 'England'
                    }
                ]
            }
        });

        (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
        (useLocalSearchParams as jest.Mock).mockReturnValue({ id: '1' });

        store.dispatch = jest.fn();
    });

    it('renders the existing holiday data from the store', () => {
        render(
            <Provider store={store}>
                <EditHolidayScreen />
            </Provider>
        );

        expect(screen.getByDisplayValue('Test Holiday')).toBeTruthy();
    });

    it('successfully dispatches update and navigates back after confirmation', () => {
        render(
            <Provider store={store}>
                <EditHolidayScreen />
            </Provider>
        );


        fireEvent.press(screen.getByTestId('save-button'));


        const confirmButton = screen.getByTestId('confirm-save-alert-confirm-button');
        fireEvent.press(confirmButton);


        expect(store.dispatch).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'holidays/updateHoliday',
                payload: expect.objectContaining({ title: 'Test Holiday' })
            })
        );
        expect(mockBack).toHaveBeenCalled();
    });

    it('shows error alert and prevents save if date is further than 6 months', async () => {
        render(
            <Provider store={store}>
                <EditHolidayScreen />
            </Provider>
        );

        const farFutureDate = new Date();
        farFutureDate.setMonth(farFutureDate.getMonth() + 7);

        const dateInput = screen.getByTestId('date-input');

        act(() => {
            fireEvent(dateInput, 'onChangeDate', farFutureDate);
        });

        fireEvent.press(screen.getByTestId('save-button'));


        expect(await screen.findByTestId('date-error-alert')).toBeTruthy();


        expect(screen.queryByTestId('confirm-save-alert')).toBeNull();


        expect(store.dispatch).not.toHaveBeenCalled();
    });

    it('shows validation error when title is empty', () => {
        render(
            <Provider store={store}>
                <EditHolidayScreen />
            </Provider>
        );

        const titleInput = screen.getByDisplayValue('Test Holiday');

        fireEvent.changeText(titleInput, '');
        fireEvent.press(screen.getByTestId('save-button'));

        expect(screen.getByText('Holiday name is required')).toBeTruthy();
        expect(store.dispatch).not.toHaveBeenCalled();
    });
});