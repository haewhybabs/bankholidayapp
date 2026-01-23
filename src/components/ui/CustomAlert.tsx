import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Colors } from '@/src/theme/colors';

interface CustomAlertProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    icon?: any;
    type?: 'danger' | 'warning' | 'info';
}

export const CustomAlert = ({
    visible,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    cancelText = "Cancel",
    icon: Icon,
    type = 'info'
}: CustomAlertProps) => {

    const config = {
        danger: { bg: 'bg-red-50', icon: Colors.rose[600], btn: 'bg-red-500' },
        warning: { bg: 'bg-orange-50', icon: Colors.amber[500], btn: 'bg-orange-500' },
        info: { bg: 'bg-blue-50', icon: Colors.primary[600], btn: 'bg-blue-600' }
    }[type];

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
            <Pressable style={styles.overlay} onPress={onClose}>

                <Pressable className="bg-white w-[85%] rounded-[40px] p-8 items-center shadow-2xl border border-slate-50">

                    {Icon && (
                        <View className={`w-20 h-20 rounded-[30px] items-center justify-center mb-6 ${config.bg}`}>
                            <Icon size={38} color={config.icon} strokeWidth={2.5} />
                        </View>
                    )}


                    <Text className="text-2xl font-black text-slate-900 text-center mb-2 tracking-tight">
                        {title}
                    </Text>


                    <Text className="text-[15px] text-slate-500 text-center leading-6 mb-10 px-2 font-medium">
                        {description}
                    </Text>

                    <View className="w-full flex-row gap-3">
                        <TouchableOpacity
                            onPress={onClose}
                            activeOpacity={0.7}
                            className="flex-1 bg-slate-100 py-4 rounded-3xl items-center"
                        >
                            <Text className="text-slate-600 font-bold text-base">
                                {cancelText}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            activeOpacity={0.8}
                            className={`flex-1 py-4 rounded-3xl items-center shadow-md shadow-slate-200 ${config.btn}`}
                        >
                            <Text className="text-white font-black text-base">
                                {confirmText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});