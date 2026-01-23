import { Colors } from '@/src/theme/colors';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    loading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const Button = ({
    label,
    onPress,
    variant = 'primary',
    loading,
    disabled,
    className = ''
}: ButtonProps) => {

    const isInteractionDisabled = disabled || loading;

    const variants = {
        primary: 'bg-blue-600 active:bg-blue-700',
        secondary: 'bg-slate-100 active:bg-slate-200',
        outline: 'bg-transparent border border-slate-200 active:bg-slate-50',
    };

    const textColors = {
        primary: 'text-white',
        secondary: 'text-slate-900',
        outline: 'text-slate-600',
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={isInteractionDisabled}

            className={`py-4 px-6 rounded-2xl flex-row justify-center items-center ${variants[variant]} ${isInteractionDisabled ? 'opacity-50' : ''} ${className}`}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary[600]} />
            ) : (
                <Text className={`font-bold text-lg ${textColors[variant]}`}>{label}</Text>
            )}
        </TouchableOpacity>
    );
};