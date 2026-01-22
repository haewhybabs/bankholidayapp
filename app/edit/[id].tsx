import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { updateHoliday } from '@/src/store/holidaySlice';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Heading } from '@/src/components/ui/Typography';

export default function EditHolidayScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const holiday = useSelector((state: RootState) =>
        state.holidays.items.find(h => h.id === id)
    );

    const [title, setTitle] = useState(holiday?.title || '');
    const [date, setDate] = useState(new Date(holiday?.date || Date.now()));

    const handleSave = () => {
        // Validation: Must be within 6 months
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

        if (date > sixMonthsFromNow) {
            Alert.alert("Invalid Date", "Holidays cannot be set further than 6 months into the future.");
            return;
        }

        dispatch(updateHoliday({
            ...holiday!,
            title,
            date: date.toISOString() // Store as ISO string
        }));

        router.back();
    };

    return (
        <ScrollView className="flex-1 bg-white p-6">
            <Heading>Edit Details</Heading>

            <Input
                label="Holiday Name"
                value={title}
                onChangeText={setTitle}
            />

            <Input
                label="Date"
                type="calendar"
                value={date.toLocaleDateString('en-GB')}
                dateValue={date}
                onChangeDate={setDate}
            />

            <View className="mt-10">
                <Button label="Update Holiday" onPress={handleSave} />
            </View>
        </ScrollView>
    );
}