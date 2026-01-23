import { View, Text } from 'react-native';
import { CloudOff } from 'lucide-react-native';
import { Button } from '../ui/Button';
import { Colors } from '@/src/theme/colors';

interface EmptyStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const EmptyState = ({
    title = "No Holidays Found",
    message = "We couldn't find any bank holidays for this period.",
    onRetry
}: EmptyStateProps) => (
    <View className="flex-1 justify-center items-center p-10 mt-10">
        <View className="bg-slate-100 p-8 rounded-full mb-6">
            <CloudOff size={48} color={Colors.slate[500]} />
        </View>
        <Text className="text-xl font-bold text-slate-900 mb-2 text-center">{title}</Text>
        <Text className="text-slate-500 text-center mb-8 leading-5">{message}</Text>
        {onRetry && (
            <Button label="Refresh Data" onPress={onRetry} variant="outline" className="w-full" />
        )}
    </View>
);