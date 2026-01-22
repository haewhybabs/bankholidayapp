import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, ChevronRight } from 'lucide-react-native';
import { Holiday } from '@/src/types/holiday';

export const HolidayListItem = ({ holiday, onPress }: { holiday: Holiday, onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.6}
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
);