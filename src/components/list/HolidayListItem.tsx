// src/components/list/HolidayListItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Calendar, ChevronRight, Trash2 } from 'lucide-react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Holiday } from '@/src/types/holiday';

interface Props {
    holiday: Holiday;
    onPress: () => void;
    onDelete?: () => void;
}

export const HolidayListItem = ({ holiday, onPress, onDelete }: Props) => {


    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        dragX: Animated.AnimatedInterpolation<number>
    ) => {
        const scale = dragX.interpolate({
            inputRange: [-80, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <TouchableOpacity
                onPress={onDelete}
                activeOpacity={0.8}
                className="bg-red-500 justify-center items-center w-20 mb-3 rounded-r-3xl"
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Trash2 size={24} color="white" />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            friction={2}
            rightThreshold={40}
        >
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={1} // Keep it 1 so the swipe feels like a physical layer
                className="flex-row items-center bg-white mx-4 p-4 rounded-3xl mb-3 border border-slate-100 shadow-sm"
            >
                <View className="bg-blue-50 p-3 rounded-2xl mr-4">
                    <Calendar size={20} color="#2563eb" />
                </View>

                <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-[16px]">{holiday.title}</Text>
                    <Text className="text-slate-500 text-xs mt-0.5">{holiday.date}</Text>
                </View>

                <ChevronRight size={18} color="#cbd5e1" />
            </TouchableOpacity>
        </Swipeable>
    );
};