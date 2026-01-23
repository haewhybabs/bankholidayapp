import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Holiday } from '../types/holiday';
import { processHolidays } from '../utils/holidayUtils';

// Async thunk to fetch the data
export const fetchHolidays = createAsyncThunk<
    Holiday[],
    void,
    { rejectValue: string }
>('holidays/fetch', async (_, { rejectWithValue }) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const URL = 'https://www.gov.uk/bank-holidays.json';

        const response = await fetch(URL, {
            method: 'GET',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            return rejectWithValue(`HTTP ${response.status}`);
        }

        const data = await response.json();
        return processHolidays(data);
    } catch (err: any) {
        if (err.name === 'AbortError') {
            return rejectWithValue('Request timed out');
        }
        return rejectWithValue(err.message || 'Network error');
    } finally {
        clearTimeout(timeoutId);
    }
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
        deleteHoliday: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((h) => h.id !== action.payload);
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

export const { updateHoliday, deleteHoliday } = holidaySlice.actions;
export default holidaySlice.reducer;