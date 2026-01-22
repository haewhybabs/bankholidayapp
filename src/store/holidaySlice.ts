import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Holiday } from '../types/holiday';
import { processHolidays } from '../utils/holidayUtils';

// Async thunk to fetch the data
export const fetchHolidays = createAsyncThunk('holidays/fetch', async () => {
    const response = await fetch('https://www.gov.uk/bank-holidays.json');
    if (!response.ok) throw new Error('Failed to fetch holidays');
    const data = await response.json();
    return processHolidays(data);
});

interface HolidayState {
    items: Holiday[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: HolidayState = {
    items: [],
    status: 'idle',
    error: null,
};

const holidaySlice = createSlice({
    name: 'holidays',
    initialState,
    reducers: {
        // Example reducer to update a holiday (if needed)
        updateHoliday: (state, action: PayloadAction<Holiday>) => {
            const index = state.items.findIndex((h) => h.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidays.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHolidays.fulfilled, (state, action: PayloadAction<Holiday[]>) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchHolidays.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { updateHoliday } = holidaySlice.actions;
export default holidaySlice.reducer;