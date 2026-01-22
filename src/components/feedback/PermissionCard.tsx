import { View, Text } from 'react-native';
import { Button } from '../ui/Button';
import { AlertCircle } from 'lucide-react-native';

interface PermissionCardProps {
    onSettingsPress: () => void;
}

export const PermissionCard = ({ onSettingsPress }: PermissionCardProps) => (
    <View className="bg-red-50 border border-red-100 p-6 rounded-[32px] m-4">
        <View className="flex-row items-center mb-4">
            <AlertCircle color="#ef4444" size={24} />
            <Text className="text-red-900 font-bold ml-2 text-lg">Calendar Access Required</Text>
        </View>
        <Text className="text-red-700 mb-6 leading-5">
            To add bank holidays to your device, we need permission to access your calendar.
        </Text>
        <Button
            label="Open Settings"
            onPress={onSettingsPress}
            variant="primary"
            className="bg-red-600"
        />
    </View>
);