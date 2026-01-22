import { Link, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from '@/src/store';
import { OfflineProvider } from '@/src/context/OfflineContext';
import "../global.css";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <OfflineProvider>
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        <Stack
                            screenOptions={{
                                headerStyle: { backgroundColor: 'white' },
                                headerShadowVisible: false,
                                headerTitleStyle: { fontWeight: 'bold', color: '#0f172a' },
                            }}
                        >
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="edit/[id]"
                                options={{
                                    presentation: 'modal',
                                    headerTitle: 'Edit Holiday',
                                    headerRight: () => (
                                        <Link href="../" className="text-blue-600 font-semibold px-2">
                                            Cancel
                                        </Link>
                                    )
                                }}
                            />
                        </Stack>
                    </GestureHandlerRootView>
                </OfflineProvider>
            </PersistGate>
        </Provider>
    );
}