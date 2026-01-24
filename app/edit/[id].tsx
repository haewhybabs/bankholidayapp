import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/src/store';
import { updateHoliday } from '@/src/store/holidaySlice';

import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Heading } from '@/src/components/ui/Typography';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomAlert } from '@/src/components/ui/CustomAlert';
import { CalendarClock, X, Save } from 'lucide-react-native';
import { Colors } from '@/src/theme/colors';

export default function EditHolidayScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const holiday = useSelector((state: RootState) =>
        state.holidays.items.find(h => h.id === id)
    );

    const [title, setTitle] = useState(holiday?.title || '');
    const [showConfirm, setShowConfirm] = useState(false);
    const [date, setDate] = useState(new Date(holiday?.date || Date.now()));

    // Validation States
    const [errors, setErrors] = useState<{ title?: string }>({});
    const [dateError, setDateError] = useState<{ visible: boolean; message: string } | null>(null);

    const handleSave = () => {
        const newErrors: { title?: string } = {};

        if (!title.trim()) {
            newErrors.title = "Holiday name is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

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
        setShowConfirm(true);
    };

    const confirmAndSave = () => {
        setShowConfirm(false);
        dispatch(updateHoliday({
            ...holiday!,
            title,
            date: date.toISOString().split('T')[0]
        }));
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row items-center justify-between">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="bg-slate-50 p-2 rounded-full border border-slate-100"
                >
                    <View pointerEvents="none">
                        <X size={24} color={Colors.slate[600]} strokeWidth={2.5} />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView className="flex-1 bg-white px-6">
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

            <CustomAlert
                visible={showConfirm}
                type="info"
                icon={Save}
                title="Save Changes?"
                description="Are you sure you want to update this holiday detail?"
                confirmText="Yes, Save"
                onConfirm={confirmAndSave}
                onClose={() => setShowConfirm(false)}
            />
        </SafeAreaView>
    );
}