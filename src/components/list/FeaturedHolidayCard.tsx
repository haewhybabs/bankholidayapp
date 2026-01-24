import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'; // Standard Swipeable
import { Button } from '../ui/Button';
import { Holiday } from '@/src/types/holiday';
import { Edit3, Trash2 } from 'lucide-react-native';
import { formatHolidayDate } from '@/src/utils/formatUtils';
import { Colors } from '@/src/theme/colors';

export const FeaturedHolidayCard = ({
    holiday,
    onAdd,
    onPress,
    isLoading,
    onDelete,
    testID
}: {
    holiday: Holiday,
    onAdd: () => void,
    onPress: () => void,
    isLoading?: boolean,
    testID?: string;
    onDelete: () => void,
}) => {

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
                className="mb-8 mr-4 justify-center items-center w-24 rounded-[40px]"
                style={{ backgroundColor: Colors.rose[50] }}
                testID={`${testID}-swipe-delete`}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Trash2 size={28} color={Colors.rose[600]} pointerEvents='none' />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable
            friction={2}
            rightThreshold={40}
            renderRightActions={renderRightActions}
            containerStyle={{ overflow: 'visible' }}
        >
            <View className="px-4 mb-8">
                <TouchableOpacity
                    activeOpacity={0.9}
                    testID={testID}
                    onPress={onPress}
                    className="bg-white rounded-[40px] shadow-xl shadow-slate-200 overflow-hidden border border-slate-50"
                >
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop' }}
                        className="h-48 justify-between p-6"
                    >
                        <View className="bg-black/30 absolute inset-0" />
                        <View className="flex-row justify-between items-start">
                            <View className="bg-white/20 self-start px-3 py-1 rounded-full border border-white/30">
                                <Text className="text-white text-xs font-bold uppercase tracking-widest">Next Holiday</Text>
                            </View>
                            <View className="bg-white/20 p-2 rounded-full border border-white/30">
                                <Edit3 size={16} color="white" />
                            </View>
                        </View>
                    </ImageBackground>

                    <View className="p-6">
                        <View className="flex-row justify-between items-center mb-1">
                            <Text className="text-3xl font-black text-slate-900 flex-1">{holiday.title}</Text>
                        </View>

                        {holiday.region && (
                            <Text numberOfLines={1} className="text-[10px] text-slate-500 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                                {holiday.region}
                            </Text>
                        )}
                        <Text className="text-slate-500 mb-6 text-lg">{formatHolidayDate(holiday.date)}</Text>

                        <View className="flex-row gap-3">
                            <View className="flex-1">
                                <Button testID={`${testID}-add-button`} label="Add to Calendar" onPress={onAdd} loading={isLoading} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
};