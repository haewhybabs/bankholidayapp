import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button } from '../ui/Button';

interface ConfirmationModalProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    isDestructive?: boolean;
}

export const ConfirmationModal = ({
    visible,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLabel = "Confirm",
    isDestructive = false
}: ConfirmationModalProps) => (
    <Modal visible={visible} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
            <View className="bg-white w-full rounded-[32px] p-8 shadow-2xl">
                <Text className="text-2xl font-black text-slate-900 mb-2">{title}</Text>
                <Text className="text-slate-500 mb-8 text-lg leading-6">{message}</Text>

                <View className="flex-row space-x-3">
                    <View className="flex-1">
                        <Button label="Cancel" variant="secondary" onPress={onCancel} />
                    </View>
                    <View className="flex-1">
                        <Button
                            label={confirmLabel}
                            onPress={onConfirm}
                            className={isDestructive ? "bg-red-600" : ""}
                        />
                    </View>
                </View>
            </View>
        </View>
    </Modal>
);