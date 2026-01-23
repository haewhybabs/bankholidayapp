import { useState, useEffect } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as Calendar from 'expo-calendar';

export const useCalendarPermission = () => {
    const [status, setStatus] = useState<Calendar.PermissionStatus>(Calendar.PermissionStatus.UNDETERMINED);

    const checkPermission = async () => {
        const { status: currentStatus } = await Calendar.getCalendarPermissionsAsync();
        setStatus(currentStatus);
    };

    useEffect(() => {
        checkPermission();

        // Listen for the user returning from System Settings
        const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'active') {
                checkPermission();
            }
        });

        return () => subscription.remove();
    }, []);

    const isGranted = status === Calendar.PermissionStatus.GRANTED;

    return { isGranted, status, checkPermission };
};