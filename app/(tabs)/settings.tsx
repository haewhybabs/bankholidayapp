import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Globe, Shield, Info, ChevronRight } from 'lucide-react-native';
import { Heading } from '@/src/components/ui/Typography';

export default function SettingsScreen() {
    const router = useRouter();

    const SettingItem = ({ icon: Icon, label, onPress, sublabel }: any) => (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row items-center bg-white p-4 rounded-3xl mb-3 border border-slate-100"
        >
            <View className="bg-slate-50 p-3 rounded-2xl mr-4">
                <Icon size={20} color="#64748b" />
            </View>
            <View className="flex-1">
                <Text className="font-bold text-slate-900">{label}</Text>
                {sublabel && <Text className="text-slate-500 text-xs">{sublabel}</Text>}
            </View>
            <ChevronRight size={18} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <ScrollView className="flex-1 bg-slate-50 p-6">
            <Heading>Settings</Heading>

            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4 ml-2">
                Preferences
            </Text>

            <SettingItem
                icon={Globe}
                label="Region"
                sublabel="England & Wales"
                onPress={() => router.push('/region')}
            />

            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-6 mb-4 ml-2">
                Support & Legal
            </Text>

            <SettingItem icon={Shield} label="Privacy Policy" />
            <SettingItem icon={Info} label="About App" sublabel="v1.0.2" />
        </ScrollView>
    );
}