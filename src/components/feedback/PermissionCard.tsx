import React from 'react';
import { TouchableOpacity, Text, View, Linking } from 'react-native';
import { ShieldAlert, ChevronRight } from 'lucide-react-native';

interface Props {
    visible: boolean;
}

export const PermissionCard = ({ visible }: Props) => {
    if (!visible) return null;

    return (
        <View className="px-4 py-2 bg-white">
            <TouchableOpacity
                onPress={() => Linking.openSettings()}
                activeOpacity={0.8}
                // Soft pink/rose theme with a subtle border
                className="bg-rose-50 border border-rose-100 rounded-2xl px-4 py-3 flex-row items-center justify-between"
            >
                <View className="flex-row items-center flex-1">
                    {/* Darker rose icon for contrast */}
                    <View className="bg-rose-100 p-2 rounded-xl">
                        <ShieldAlert size={18} color="#e11d48" />
                    </View>

                    <View className="ml-3 flex-1">
                        <Text className="text-rose-900 font-bold text-[13px]">
                            Calendar Sync Disabled
                        </Text>
                        <Text className="text-rose-600/80 text-[11px] font-medium">
                            Enable permissions in settings to sync holidays.
                        </Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <Text className="text-rose-500 text-[11px] font-bold mr-1">Fix</Text>
                    <ChevronRight size={14} color="#f43f5e" />
                </View>
            </TouchableOpacity>
        </View>
    );
};