import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Calendar, ChevronRight, Trash2 } from 'lucide-react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Holiday } from '@/src/types/holiday';
import { formatHolidayDate } from '@/src/utils/formatUtils';

interface Props {
    holiday: Holiday;
    onPress: () => void;
    onDelete?: () => void;
    onAddCalendar?: () => void;
}

export const HolidayListItem = ({ holiday, onPress, onDelete, onAddCalendar }: Props) => {
    const renderRightActions = (progress: any, dragX: any) => {
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
        <Swipeable renderRightActions={renderRightActions} friction={2}>
            <View className="bg-white mx-4 rounded-3xl mb-3 border border-slate-100 shadow-sm overflow-hidden">
                <View className="flex-row items-center p-4">

                    <TouchableOpacity
                        onPress={onPress}
                        className="flex-1 flex-row items-center"
                        activeOpacity={0.6}
                    >
                        <View className="bg-blue-50 p-3 rounded-2xl mr-4">
                            <Calendar size={20} color="#2563eb" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-slate-900 text-[16px] mb-0.5">
                                {holiday.title}
                            </Text>
                            {holiday.region && (
                                <Text numberOfLines={1} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                                    {holiday.region}
                                </Text>
                            )}

                            {/* Inline Date and Action */}
                            <View className="flex-row items-center">
                                <Text className="text-slate-500 text-xs font-medium">
                                    {formatHolidayDate(holiday.date)}
                                </Text>

                                <Text className="text-slate-300 mx-2">•</Text>

                                <TouchableOpacity
                                    onPress={onAddCalendar}
                                    hitSlop={{ top: 15, bottom: 15, left: 10, right: 10 }}
                                >
                                    <Text className="text-blue-600 text-xs font-bold">
                                        Add to Calendar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View className="pl-2">
                        <ChevronRight size={18} color="#cbd5e1" />
                    </View>
                </View>
            </View>
        </Swipeable>
    );
};