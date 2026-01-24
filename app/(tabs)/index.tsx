import React, { useMemo, useState } from 'react';
import { View, ScrollView, RefreshControl, Alert, Linking } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

// Hooks
import { useHolidays } from '@/src/hooks/useHolidays';
import { deleteHoliday } from '@/src/store/holidaySlice';
import { AppDispatch } from '@/src/store';

// UI Components
import { OfflineBanner } from '@/src/components/feedback/OfflineBanner';
import { SkeletonLoader } from '@/src/components/list/SkeletonLoader';
import { EmptyState } from '@/src/components/feedback/EmptyState';
import { FeaturedHolidayCard } from '@/src/components/list/FeaturedHolidayCard';
import { HolidayListItem } from '@/src/components/list/HolidayListItem';
import { ConfirmationModal } from '@/src/components/modals/ConfirmationModal';
import { useCalendar } from '@/src/hooks/useCalendar';
import { Holiday } from '@/src/types/holiday';
import { HomeHeader } from '@/src/components/home/HomeHeader';
import { CustomAlert } from '@/src/components/ui/CustomAlert';
import { Trash2, CalendarCheck } from 'lucide-react-native';
import { PermissionCard } from '@/src/components/feedback/PermissionCard';
import { useCalendarPermission } from '@/src/hooks/useCalendarPermission';

export default function HomeScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const { holidays, isLoading, error, refresh } = useHolidays();
    const { addToCalendar } = useCalendar();
    const { isGranted, status } = useCalendarPermission();

    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState<{ visible: boolean; title: string } | null>(null);
    const [syncingId, setSyncingId] = useState<string | null>(null);
    const [errorAlert, setErrorAlert] = useState<{ visible: boolean; title: string; message: string } | null>(null);
    const insets = useSafeAreaInsets();


    const [isShowingSkeleton, setIsShowingSkeleton] = useState(true);

    // Artificial delay to demonstrate the transition/skeleton
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsShowingSkeleton(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);


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
    if (isShowingSkeleton || (isLoading && holidays.length === 0)) {
        return (
            <SafeAreaView className="flex-1 bg-slate-50">
                <SkeletonLoader />
            </SafeAreaView>
        );
    }

    const handleAddToCalendar = async (holiday: Holiday) => {
        setSyncingId(holiday.id);
        const result = await addToCalendar(holiday.title, holiday.date);
        setSyncingId(null);

        if (result.success) {
            setShowSuccess({ visible: true, title: holiday.title });
        } else if (result.error === 'already_exists') {
            setErrorAlert({
                visible: true,
                title: "Already Synced",
                message: `"${holiday.title}" is already in your calendar.`
            });
        } else if (result.error === 'permission') {
            setErrorAlert({
                visible: true,
                title: "Permission Denied",
                message: "We need calendar access to add holidays. Please check your system settings."
            });
        }
    };

    return (
        <View className="flex-1 bg-white" testID="home-screen">

            <View style={{ height: insets.top }} className="bg-white" />

            <HomeHeader onRefresh={refresh} isRefreshing={isLoading} />

            <OfflineBanner testID="offline-banner" />

            <PermissionCard visible={status === 'denied'} />

            <ScrollView
                testID="holiday-scroll-view"
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
                            testID="empty-state"
                            message={error || "No holidays found."}
                            onRetry={refresh}
                        />
                    ) : (
                        <>
                            {featured && (
                                <FeaturedHolidayCard
                                    testID="featured-holiday-card"
                                    holiday={featured}
                                    isLoading={syncingId === featured.id}
                                    onAdd={() => handleAddToCalendar(featured)}
                                    onPress={() => router.push(`/edit/${featured.id}`)}
                                    onDelete={() => setIdToDelete(featured.id)}
                                />
                            )}

                            <View className="mt-2">
                                {remainder.map((item) => (
                                    <HolidayListItem
                                        key={item.id}
                                        testID={`holiday-item-${item.id}`}
                                        holiday={item}
                                        onPress={() => router.push(`/edit/${item.id}`)}
                                        onDelete={() => setIdToDelete(item.id)}
                                        onAddCalendar={() => handleAddToCalendar(item)}
                                    />
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>

            {/* Alert for Deletion */}
            <CustomAlert
                visible={!!idToDelete}
                testID="delete-confirmation-alert"
                type="danger"
                icon={Trash2}
                title="Remove Holiday"
                description="Are you sure? This will remove the holiday from your local list, but won't affect the official UK calendar."
                confirmText="Remove"
                onConfirm={handleConfirmDelete}
                onClose={() => setIdToDelete(null)}
            />

            <CustomAlert
                visible={!!showSuccess?.visible}
                testID="sync-success-alert"
                type="info"
                icon={CalendarCheck}
                title="Added to Calendar"
                description={`${showSuccess?.title} has been successfully synced to your device calendar.`}
                confirmText="Great"
                cancelText='Close'
                onConfirm={() => setShowSuccess(null)}
                onClose={() => setShowSuccess(null)}
            />
            <CustomAlert
                testID="sync-error-alert"
                visible={!!errorAlert?.visible}
                type="warning"
                icon={CalendarCheck}
                title={errorAlert?.title || ""}
                description={errorAlert?.message || ""}
                confirmText="Got it"
                onConfirm={() => setErrorAlert(null)}
                onClose={() => setErrorAlert(null)}
            />
        </View>
    );
}