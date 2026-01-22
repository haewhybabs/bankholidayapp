import { View, Text, ImageBackground } from 'react-native';
import { Button } from '../ui/Button';
import { Holiday } from '@/src/types/holiday';

export const FeaturedHolidayCard = ({ holiday, onAdd, isLoading }: { holiday: Holiday, onAdd: () => void, isLoading?: boolean }) => (
    <View className="px-4 mb-8">
        <View className="bg-white rounded-[40px] shadow-xl shadow-slate-200 overflow-hidden border border-slate-50">
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop' }}
                className="h-48 justify-end p-6"
            >
                <View className="bg-black/20 absolute inset-0" />
                <View className="bg-white/20 self-start px-3 py-1 rounded-full border border-white/30">
                    <Text className="text-white text-xs font-bold uppercase tracking-widest">Next Holiday</Text>
                </View>
            </ImageBackground>

            <View className="p-6">
                <Text className="text-3xl font-black text-slate-900 mb-1">{holiday.title}</Text>
                <Text className="text-slate-500 mb-6 text-lg">{holiday.date}</Text>
                <Button label="Add to Calendar" onPress={onAdd} loading={isLoading} />
            </View>
        </View>
    </View>
);