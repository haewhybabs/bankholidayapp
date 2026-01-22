import { View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

// UI Atoms
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { Heading } from "@/src/components/ui/Typography";

// Feedback Components
import { OfflineBanner } from "@/src/components/feedback/OfflineBanner";
import { PermissionCard } from "@/src/components/feedback/PermissionCard";

// List Components
import { FeaturedHolidayCard } from "@/src/components/list/FeaturedHolidayCard";
import { HolidayListItem } from "@/src/components/list/HolidayListItem";

export default function Home() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new Date());

    const mockHoliday = {
        id: '1',
        title: 'Summer Bank Holiday',
        date: 'Monday, 25 August 2026',
        notes: 'National holiday',
        bunting: true
    };

    const handleSave = () => {
        console.log("Saved:", { title, date });
    };

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <SafeAreaView className="flex-1 bg-slate-50">
            {/* 1. Test Feedback: Offline Banner */}
            <OfflineBanner />

            <ScrollView className="flex-1">
                <View className="py-6">
                    <View className="px-6 mb-6">
                        <Heading>Component Testing</Heading>
                    </View>

                    {/* 2. Test List: Featured Card */}
                    <FeaturedHolidayCard
                        holiday={mockHoliday}
                        onAdd={() => console.log("Add to calendar pressed")}
                    />

                    {/* 3. Test Feedback: Permission Alert */}
                    <PermissionCard onSettingsPress={() => console.log("Open settings")} />

                    {/* 4. Test UI Atoms: Form in a Card */}
                    <View className="px-4 mb-8">
                        <Card>
                            <Input
                                label="Holiday Title"
                                type="text"
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Enter holiday name..."
                            />

                            <Input
                                label="Holiday Date"
                                type="calendar"
                                value={formattedDate}
                                dateValue={date}
                                onChangeDate={(newDate: Date) => setDate(newDate)}
                            />
                            <Button label="Save Changes" onPress={handleSave} />
                        </Card>
                    </View>

                    {/* 5. Test List: Standard List Items */}
                    <View className="px-2">
                        <View className="px-4 mb-4">
                            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                Upcoming Items
                            </Text>
                        </View>
                        <HolidayListItem
                            holiday={mockHoliday}
                            onPress={() => console.log("Item 1 pressed")}
                        />
                        <HolidayListItem
                            holiday={{ ...mockHoliday, title: "Christmas Day", date: "25 Dec" }}
                            onPress={() => console.log("Item 2 pressed")}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}