import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Stack, useRouter } from 'expo-router';
import { RootState, AppDispatch } from '@/src/store';
import { fetchHolidays } from '@/src/store/holidaySlice';
import * as SplashScreen from 'expo-splash-screen';

export default function Splash() {
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSelector((state: RootState) => state.holidays);
    const router = useRouter();

    useEffect(() => {

        dispatch(fetchHolidays());
    }, []);

    useEffect(() => {
        if (status === 'succeeded' || status === 'failed') {
            setTimeout(() => {
                SplashScreen.hideAsync();
                router.replace('/(tabs)');
            }, 1500);

        }
    }, [status]);

    return null;
}