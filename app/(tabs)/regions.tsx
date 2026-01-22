import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { Heading } from '@/src/components/ui/Typography';
import React from 'react';
import { Button } from '@/src/components/ui/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

const REGIONS = [
    { id: 'england-and-wales', label: 'England & Wales' },
    { id: 'scotland', label: 'Scotland' },
    { id: 'northern-ireland', label: 'Northern Ireland' }
];

export default function RegionScreen() {
    const router = useRouter();
    const [selected, setSelected] = React.useState('england-and-wales');

    return (
        <SafeAreaView className="flex-1 bg-slate-50 p-6">
            <Heading >Select Region</Heading>
            {REGIONS.map((region) => (
                <TouchableOpacity
                    key={region.id}
                    onPress={() => setSelected(region.id)}
                    className="flex-row items-center justify-between bg-white p-5 rounded-2xl mb-3 border border-slate-100"
                >
                    <Text className={`text-lg ${selected === region.id ? 'font-bold text-blue-600' : 'text-slate-600'}`}>
                        {region.label}
                    </Text>
                    {selected === region.id && <Check color="#2563eb" size={20} />}
                </TouchableOpacity>
            ))}

            <View className="mt-auto mb-10">
                <Button label="Save Region" onPress={() => router.back()} />
            </View>
        </SafeAreaView>
    );
}