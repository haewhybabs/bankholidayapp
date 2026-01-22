// app/regions.tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ScreenHeader } from '@/src/components/ui/ScreenHeader';

const REGIONS = [
    { id: 'england-and-wales', label: 'England & Wales' },
    { id: 'scotland', label: 'Scotland' },
    { id: 'northern-ireland', label: 'Northern Ireland' }
];

export default function RegionScreen() {
    return (
        <View className="flex-1 bg-slate-50">
            <ScreenHeader title="Select Region" />

            <ScrollView className="flex-1 p-6">
                <Text className="text-slate-400 font-bold uppercase tracking-widest text-[11px] mb-4 ml-1">
                    Available Regions
                </Text>

                {REGIONS.map((region) => (
                    <View
                        key={region.id}
                        className="bg-white p-5 rounded-3xl mb-3 border border-slate-100 shadow-sm"
                    >
                        <Text className="text-lg font-bold text-slate-800">
                            {region.label}
                        </Text>
                        <Text className="text-slate-500 text-sm mt-1">
                            Official bank holidays for this territory.
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}