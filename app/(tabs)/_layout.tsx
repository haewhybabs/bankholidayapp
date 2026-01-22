import { Tabs } from 'expo-router';
import { Home, MapPin, Bell, Settings } from 'lucide-react-native';
import { Platform } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,

            tabBarActiveTintColor: '#2563eb',
            tabBarInactiveTintColor: '#94a3b8',


            tabBarStyle: {
                backgroundColor: '#ffffff',
                borderTopWidth: 0,
                elevation: 0,
                height: Platform.OS === 'ios' ? 88 : 64,
                paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                paddingTop: 10,
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: '600',
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="regions"
                options={{
                    title: 'Regions',
                    tabBarIcon: ({ color }) => <MapPin size={24} color={color} />,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}