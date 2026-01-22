import React, { useMemo, useState } from 'react';
import { View, ScrollView, RefreshControl, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

// Hooks
import { useHolidays } from '@/src/hooks/useHolidays';
import { deleteHoliday } from '@/src/store/holidaySlice';
import { AppDispatch } from '@/src/store';

// UI Components
import { Heading, Label } from '@/src/components/ui/Typography';
import { OfflineBanner } from '@/src/components/feedback/OfflineBanner';
import { SkeletonLoader } from '@/src/components/list/SkeletonLoader';
import { EmptyState } from '@/src/components/feedback/EmptyState';
import { FeaturedHolidayCard } from '@/src/components/list/FeaturedHolidayCard';
import { HolidayListItem } from '@/src/components/list/HolidayListItem';
import { ConfirmationModal } from '@/src/components/modals/ConfirmationModal';
import { useCalendar } from '@/src/hooks/useCalendar';
import { Holiday } from '@/src/types/holiday';
import { HomeHeader } from '@/src/components/home/HomeHeader';

export default function HomeScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { holidays, isLoading, error, refresh } = useHolidays();
    const { addToCalendar } = useCalendar();

    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const insets = useSafeAreaInsets();


    const { featured, remainder } = useMemo(() => {
        if (!holidays || holidays.length === 0) return { featured: null, remainder: [] };
        const [first, ...rest] = holidays;
        return { featured: first, remainder: rest };
    }, [holidays]);

    const handleConfirmDelete = () => {
        if (idToDelete) {
            dispatch(deleteHoliday(idToDelete));
            setIdToDelete(null);
        }
    };

    // Show skeleton only on initial load when list is empty
    if (isLoading && (!holidays || holidays.length === 0)) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50">
                <SkeletonLoader />
            </SafeAreaView>
        );
    }

    const handleAddToCalendar = async (holiday: Holiday) => {
        setIsSyncing(true);
        // Note: Ensure holiday.date is in a format Date() can parse, 
        // or use the raw ISO string if available.
        const success = await addToCalendar(holiday.title, holiday.date);
        setIsSyncing(false);

        if (success) {
            Alert.alert("Success", `${holiday.title} added to your calendar!`);
        }
    };

    return (
        <View className="flex-1 bg-white">

            <View style={{ height: insets.top }} className="bg-white" />

            <HomeHeader onRefresh={refresh} isRefreshing={isLoading} />

            <OfflineBanner />

            <ScrollView
                className="flex-1 bg-slate-50"
                contentContainerStyle={{ paddingBottom: 20 }}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={refresh} />
                }
                showsVerticalScrollIndicator={false}
            >
                <View className="py-6">


                    {holidays.length === 0 ? (
                        <EmptyState
                            message={error || "No holidays found."}
                            onRetry={refresh}
                        />
                    ) : (
                        <>
                            {featured && (
                                <FeaturedHolidayCard
                                    holiday={featured}
                                    isLoading={isSyncing}
                                    onAdd={() => handleAddToCalendar(featured)}
                                />
                            )}

                            <View className="mt-2">
                                {remainder.map((item) => (
                                    <HolidayListItem
                                        key={item.id}
                                        holiday={item}
                                        onPress={() => router.push(`/edit/${item.id}`)}
                                        onDelete={() => setIdToDelete(item.id)}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            <ConfirmationModal
                visible={!!idToDelete}
                title="Remove Holiday"
                message="Are you sure you want to remove this holiday from your list? This won't affect the official UK calendar."
                confirmLabel="Remove"
                isDestructive={true}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIdToDelete(null)}
            />
        </View>
    );
}