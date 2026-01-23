import { Colors } from '@/src/theme/colors';
import { Tabs } from 'expo-router';
import { Home, MapPin, Bell, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,

            tabBarActiveTintColor: Colors.primary[600],
            tabBarInactiveTintColor: Colors.slate[500],
            tabBarLabelStyle: { marginBottom: 15 },



            tabBarStyle: { paddingTop: 10, borderTopWidth: 0, elevation: 0 }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} pointerEvents="none" />,
                }}
            />
            <Tabs.Screen
                name="regions"
                options={{
                    title: 'Regions',
                    tabBarIcon: ({ color }) => <MapPin size={24} color={color} pointerEvents="none" />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Settings size={24} color={color} pointerEvents="none" />,
                }}
            />
        </Tabs>
    );
}