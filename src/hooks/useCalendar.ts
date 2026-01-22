import * as Calendar from 'expo-calendar';
import { Alert, Platform } from 'react-native';

export const useCalendar = () => {
    const requestPermissions = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        return status === 'granted';
    };

    const findOrCreateCalendar = async () => {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        // Check if our custom calendar already exists
        const existingCal = calendars.find((c) => c.title === 'Bank Holidays UK');

        if (existingCal) return existingCal.id;

        let source;
        if (Platform.OS === 'ios') {
            // This gets the default entity for iOS (usually iCloud or Local)
            const defaultCalendar = await Calendar.getDefaultCalendarAsync();
            source = defaultCalendar.source;
        } else {
            source = { name: 'Bank Holidays', type: 'local' };
        }

        return await Calendar.createCalendarAsync({
            title: 'Bank Holidays UK',
            color: '#2563eb',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: source.id,
            source: source,
            name: 'bankHolidaysInternal',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });
    };

    const addToCalendar = async (title: string, date: string) => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            Alert.alert('Permission Required', 'Please enable calendar access in settings.');
            return;
        }

        const calendarId = await findOrCreateCalendar();
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59);

        try {
            await Calendar.createEventAsync(calendarId, {
                title,
                startDate,
                endDate,
                allDay: true,
                notes: 'Synced from Bank Holiday App',
            });
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    };

    return { addToCalendar, requestPermissions };
};