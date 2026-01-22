import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Card } from "@/src/components/ui/Card";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import React, { useState } from "react";

export default function Home() {
    const [title, setTitle] = React.useState("");
    const [date, setDate] = useState(new Date());

    const handleSave = () => {
        // Handle save logic here
        console.log("Saved:", { title, date });
    };

    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return (
        //testing component integration
        <View className="flex-1 ">
            <Card>
                <Input
                    label="Holiday Title"
                    type="text"
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter holiday name..."
                />

                {/* 2. Calendar Modal Usage */}
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
    );
}