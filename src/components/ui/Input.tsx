import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Platform, Modal, Text } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { Label } from './Typography';

interface InputProps {
    label: string;
    value: string;
    dateValue?: Date;
    onChangeDate?: (date: Date) => void;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    type?: 'text' | 'calendar';
}

export const Input = ({
    label,
    value,
    dateValue = new Date(),
    onChangeDate,
    onChangeText,
    placeholder,
    type = 'text'
}: InputProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState(dateValue);
    const isCalendar = type === 'calendar';

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
            if (selectedDate && onChangeDate) onChangeDate(selectedDate);
        } else {
            if (selectedDate) setTempDate(selectedDate);
        }
    };

    const handleDone = () => {
        onChangeDate?.(tempDate);
        setShowPicker(false);
    };

    const InputContent = (
        <View className="relative">
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                // If it's a calendar, we don't want the keyboard to show up
                editable={!isCalendar}
                pointerEvents={isCalendar ? 'none' : 'auto'}
                style={{
                    textAlignVertical: 'center',
                    paddingVertical: Platform.OS === 'ios' ? 16 : 12,
                }}
                className="bg-slate-50 px-4 rounded-xl border border-slate-200 text-slate-900 text-[16px] min-h-[56px]"
                placeholderTextColor="#94a3b8"
            />
            {isCalendar && (
                <View className="absolute right-4 top-[16px]">
                    <Calendar size={20} color="#94a3b8" />
                </View>
            )}
        </View>
    );

    return (
        <View className="mb-6">
            <Label>{label}</Label>

            {/* If calendar, wrap the input in a button to trigger the modal */}
            {isCalendar ? (
                <TouchableOpacity onPress={() => setShowPicker(true)} activeOpacity={0.7}>
                    {InputContent}
                </TouchableOpacity>
            ) : (
                InputContent
            )}

            {/* iOS Modal Wrapper */}
            {isCalendar && Platform.OS === 'ios' && (
                <Modal visible={showPicker} transparent animationType="slide">
                    <View className="flex-1 justify-end bg-black/40">
                        <View className="bg-white rounded-t-[32px] pb-10 shadow-2xl">
                            <View className="flex-row justify-between items-center p-5 border-b border-slate-100">
                                <TouchableOpacity onPress={() => setShowPicker(false)}>
                                    <Text className="text-slate-500 font-semibold px-2">Cancel</Text>
                                </TouchableOpacity>
                                <Text className="font-bold text-slate-900 text-lg">Select Date</Text>
                                <TouchableOpacity onPress={handleDone}>
                                    <Text className="text-blue-600 font-bold px-2 text-lg">Done</Text>
                                </TouchableOpacity>
                            </View>

                            <DateTimePicker
                                value={tempDate}
                                mode="date"
                                display="spinner"
                                onChange={onDateChange}
                                minimumDate={new Date()}
                                textColor="#0f172a"
                                style={{ height: 250, width: '100%' }}
                            />
                        </View>
                    </View>
                </Modal>
            )}

            {/* Android Native Dialog */}
            {isCalendar && Platform.OS === 'android' && showPicker && (
                <DateTimePicker
                    value={dateValue}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                    minimumDate={new Date()}
                    textColor="#0f172a"
                />
            )}
        </View>
    );
};