import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchHolidays } from '../store/holidaySlice';
import { useOffline } from './useOffline';

export const useHolidays = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isOffline = useOffline();
    const { items, status, error } = useSelector((state: RootState) => state.holidays);

    useEffect(() => {
        // Only fetch if idle; persistence handles the rest
        if (status === 'idle') {
            dispatch(fetchHolidays());
        }
    }, [status, dispatch]);

    const refresh = () => dispatch(fetchHolidays());

    return {
        holidays: items,
        isLoading: status === 'loading',
        isOffline,
        error,
        refresh,
    };
};