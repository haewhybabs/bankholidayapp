// app/(tabs)/settings.tsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { Globe, Shield, Info, ChevronRight } from 'lucide-react-native';
import Constants from 'expo-constants';

import { RootState } from '@/src/store';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

export default function SettingsScreen() {
    const router = useRouter();

    const appVersion = Constants.expoConfig?.version || '1.0.0';



    const SettingItem = ({ icon: Icon, label, onPress, sublabel }: any) => (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className="flex-row items-center bg-white p-4 rounded-3xl mb-3 border border-slate-100 shadow-sm"
        >
            <View className="bg-slate-50 p-3 rounded-2xl mr-4">
                <Icon size={20} color="#64748b" />
            </View>
            <View className="flex-1">
                <Text className="font-bold text-slate-900 text-[15px]">{label}</Text>
                {sublabel && <Text className="text-slate-500 text-xs mt-0.5">{sublabel}</Text>}
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-slate-50">
            {/* Standardized Header */}
            <ScreenHeader title="Settings" />

            <ScrollView className="flex-1 px-6 pt-6">
                <Text className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-4 ml-2">
                    Preferences
                </Text>

                <SettingItem
                    icon={Globe}
                    label="Region"
                    sublabel="England - Wales - Scotland - N. Ireland"
                    onPress={() => router.push('/regions')}
                />

                <Text className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mt-6 mb-4 ml-2">
                    Support & Legal
                </Text>

                <SettingItem
                    icon={Shield}
                    label="Privacy Policy"
                    onPress={() => {/* Link to web */ }}
                />

                <SettingItem
                    icon={Info}
                    label="About App"
                    sublabel={`Version ${appVersion}`}
                    onPress={() => {/* Show info modal */ }}
                />

                <View className="py-10 items-center">
                    <Text className="text-slate-300 text-xs font-medium">
                        Powered by UK Government Data
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}