// src/components/home/HomeHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, RotateCcw } from 'lucide-react-native';
import { Colors } from '@/src/theme/colors';

interface Props {
    onRefresh: () => void;
    isRefreshing?: boolean;
}

export const HomeHeader = ({ onRefresh, isRefreshing }: Props) => {
    return (
        <View className="flex-row items-center justify-between px-6 py-4 bg-white">

            <View className="w-10 h-10 items-start justify-center">
                <Calendar size={24} color={Colors.slate[500]} strokeWidth={2.5} />
            </View>


            <Text className="text-[20px] font-black text-slate-900 tracking-tight">
                Upcoming Bank Holidays
            </Text>


            <TouchableOpacity
                onPress={onRefresh}
                disabled={isRefreshing}
                className="w-10 h-10 items-end justify-center"
            >
                <RotateCcw
                    size={22}
                    color={Colors.slate[500]}
                    className={isRefreshing ? 'opacity-30' : 'opacity-100'}
                    pointerEvents="none"
                />
            </TouchableOpacity>
        </View>
    );
};