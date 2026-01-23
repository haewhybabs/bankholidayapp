import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'lucide-react-native';
import { AppDispatch, RootState } from '@/src/store';
import { useHolidays } from '@/src/hooks/useHolidays';
import { fetchHolidays } from '@/src/store/holidaySlice';

export default function SplashScreen() {
    const router = useRouter();

    const { status, error } = useHolidays();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHolidays());

        const timer = setTimeout(() => {

            router.replace('/(tabs)');
        }, 1500);
        return () => clearTimeout(timer);

    }, []);

    return (
        <View className="flex-1 bg-white items-center justify-center">
            <View className="bg-blue-600 w-24 h-24 rounded-[30px] items-center justify-center shadow-2xl shadow-blue-400">
                <Calendar size={48} color="white" strokeWidth={2.5} />
            </View>

            <Text className="mt-8 text-2xl font-black text-slate-900 tracking-tight">
                Bank Holidays
            </Text>

            <View className="absolute bottom-20">
                <ActivityIndicator color="#2563eb" size="small" />
                <Text className="mt-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    Syncing Dates...
                </Text>
            </View>
        </View>
    );
}