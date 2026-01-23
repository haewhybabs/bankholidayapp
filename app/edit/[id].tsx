import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { updateHoliday } from '@/src/store/holidaySlice';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Heading } from '@/src/components/ui/Typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomAlert } from '@/src/components/ui/CustomAlert';
import { CalendarClock, AlertCircle } from 'lucide-react-native';

export default function EditHolidayScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const holiday = useSelector((state: RootState) =>
        state.holidays.items.find(h => h.id === id)
    );

    const [title, setTitle] = useState(holiday?.title || '');
    const [date, setDate] = useState(new Date(holiday?.date || Date.now()));

    // Validation States
    const [errors, setErrors] = useState<{ title?: string }>({});
    const [dateError, setDateError] = useState<{ visible: boolean; message: string } | null>(null);

    const handleSave = () => {
        const newErrors: { title?: string } = {};

        // 1. Basic Empty Validation
        if (!title.trim()) {
            newErrors.title = "Holiday name is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 2. Date Constraint Validation: Must be within 6 months
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

        if (date > sixMonthsFromNow) {
            setDateError({
                visible: true,
                message: "Holidays cannot be scheduled further than 6 months into the future."
            });
            return;
        }


        setErrors({});
        dispatch(updateHoliday({
            ...holiday!,
            title,
            date: date.toISOString().split('T')[0]
        }));

        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white p-6">
                <Heading>Edit Details</Heading>

                <View className="mt-8">
                    <Input
                        label="Holiday Name"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (errors.title) setErrors({ ...errors, title: undefined });
                        }}
                        placeholder="e.g. Summer Bank Holiday"
                        error={errors.title}
                    />

                    <Input
                        label="Date"
                        type="calendar"
                        value={date.toLocaleDateString('en-GB')}
                        dateValue={date}
                        onChangeDate={setDate}
                    />
                </View>

                <View className="mt-10">
                    <Button label="Save Changes" onPress={handleSave} />
                </View>
            </ScrollView>


            <CustomAlert
                visible={!!dateError?.visible}
                type="warning"
                icon={CalendarClock}
                title="Date Too Far"
                description={dateError?.message || ""}
                confirmText="Adjust Date"
                onConfirm={() => setDateError(null)}
                onClose={() => setDateError(null)}
            />
        </SafeAreaView>
    );
}