import { View, ScrollView, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// UI Components
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Heading } from "@/src/components/ui/Typography";

// Feedback & List
import { OfflineBanner } from "@/src/components/feedback/OfflineBanner";
import { SkeletonLoader } from "@/src/components/list/SkeletonLoader";
import { EmptyState } from "@/src/components/feedback/EmptyState";
import { FeaturedHolidayCard } from "@/src/components/list/FeaturedHolidayCard";
import { HolidayListItem } from "@/src/components/list/HolidayListItem";
import { ConfirmationModal } from "@/src/components/modals/ConfirmationModal";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [showEmpty, setShowEmpty] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const mockHoliday = {
        id: '1',
        title: 'Summer Bank Holiday',
        date: 'Monday, 25 August 2026',
        notes: 'A day to celebrate the end of summer.',
        bunting: true,



    };

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
    });

    if (isLoading) return <SafeAreaView className="flex-1 bg-slate-50"><SkeletonLoader /></SafeAreaView>;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="flex-1 bg-slate-50">
                <OfflineBanner />

                <ScrollView className="flex-1">
                    <View className="py-6">
                        <View className="px-6 mb-6 flex-row justify-between items-center">
                            <Heading>Full Test</Heading>
                            <TouchableOpacity onPress={() => setShowEmpty(!showEmpty)}>
                                <Text className="text-blue-600 text-xs">Toggle Empty State</Text>
                            </TouchableOpacity>
                        </View>

                        {showEmpty ? (
                            <EmptyState onRetry={() => setShowEmpty(false)} />
                        ) : (
                            <>
                                <FeaturedHolidayCard
                                    holiday={mockHoliday}
                                    onAdd={() => Alert.alert("Calendar", "Added to your calendar!")}
                                />

                                <View className="px-4 mb-8">
                                    <Card>
                                        <Input label="Edit Title" type="text" value={title} onChangeText={setTitle} />
                                        <Input
                                            label="Edit Date"
                                            type="calendar"
                                            value={formattedDate}
                                            dateValue={date}
                                            onChangeDate={setDate}
                                        />
                                        <Button label="Save Changes" onPress={() => setIsLoading(true)} />
                                    </Card>
                                </View>

                                <View className="px-2">
                                    <View className="px-4 mb-4">
                                        <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                            Swipe left to delete items
                                        </Text>
                                    </View>
                                    <HolidayListItem
                                        holiday={mockHoliday}
                                        onPress={() => { }}
                                        onDelete={() => setShowDeleteModal(true)}
                                    />
                                </View>
                            </>
                        )}
                    </View>
                </ScrollView>

                <ConfirmationModal
                    visible={showDeleteModal}
                    title="Delete Holiday?"
                    message="Are you sure you want to remove this bank holiday from your list?"
                    confirmLabel="Delete"
                    isDestructive={true}
                    onConfirm={() => setShowDeleteModal(false)}
                    onCancel={() => setShowDeleteModal(false)}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}