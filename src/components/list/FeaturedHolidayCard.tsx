import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button } from '../ui/Button';
import { Holiday } from '@/src/types/holiday';
import { Edit3 } from 'lucide-react-native';
import { formatHolidayDate } from '@/src/utils/formatUtils';

export const FeaturedHolidayCard = ({
    holiday,
    onAdd,
    onPress,
    isLoading
}: {
    holiday: Holiday,
    onAdd: () => void,
    onPress: () => void,
    isLoading?: boolean
}) => (
    <View className="px-4 mb-8">
        <TouchableOpacity
            activeOpacity={0.9}
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
                <Text className="text-3xl font-black text-slate-900 mb-1">{holiday.title}</Text>
                {holiday.region && (
                    <Text numberOfLines={1} className="text-[10px]  text-slate-500 py-0.5 rounded-full uppercase font-bold tracking-tighter">
                        {holiday.region}
                    </Text>
                )}
                <Text className="text-slate-500 mb-6 text-lg">{formatHolidayDate(holiday.date)}</Text>

                <View className="flex-row gap-3">
                    <View className="flex-1">
                        <Button label="Add to Calendar" onPress={onAdd} loading={isLoading} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    </View>
);