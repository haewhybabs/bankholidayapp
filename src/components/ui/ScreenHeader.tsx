// src/components/navigation/ScreenHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/src/theme/colors';

interface Props {
    title: string;
    showBack?: boolean;
}

export const ScreenHeader = ({ title, showBack = true }: Props) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }} className="bg-white border-b border-slate-100">
            <View className="h-14 flex-row items-center px-4 relative">
                {showBack && (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="z-10 w-10 h-10 items-center justify-center rounded-full active:bg-slate-100"
                    >
                        <ChevronLeft size={28} color={Colors.slate[800]} strokeWidth={2.5} />
                    </TouchableOpacity>
                )}
                <View className="absolute left-0 right-0 top-0 bottom-0 items-center justify-center">
                    <Text className="text-[18px] font-black text-slate-900 tracking-tight">
                        {title}
                    </Text>
                </View>
            </View>
        </View>
    );
};