import { Link, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "../global.css";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Stack>

                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


                        <Stack.Screen
                            name="edit/[id]"
                            options={{
                                presentation: 'modal',
                                headerTitle: 'Edit Holiday',
                                headerRight: () => (
                                    <Link href="../" style={{ color: '#2563eb' }}>Cancel</Link>
                                )
                            }}
                        />
                    </Stack>
                </GestureHandlerRootView>
            </PersistGate>
        </Provider>
    );
}