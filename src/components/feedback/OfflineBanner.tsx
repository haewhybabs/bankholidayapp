import { View, Text, Animated } from 'react-native';
import { useOffline } from '@/src/hooks/useOffline';
import { WifiOff } from 'lucide-react-native';
import { Colors } from '@/src/theme/colors';

export const OfflineBanner = ({ testID }: {
    testID?: string;
}) => {
    const isOffline = useOffline();

    if (!isOffline) return null;

    return (
        <View className="bg-amber-50 border-b border-amber-100 px-6 py-3 flex-row items-center" testID={testID}>
            <View className="bg-amber-100 p-2 rounded-full mr-3">
                <WifiOff size={16} color={Colors.amber[700]} />
            </View>
            <View>
                <Text className="text-amber-900 font-bold text-xs uppercase tracking-wider">
                    Offline Mode
                </Text>
                <Text className="text-amber-700 text-[11px]">
                    Showing locally saved bank holidays
                </Text>
            </View>
        </View>
    );
};