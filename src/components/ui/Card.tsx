// src/components/ui/Card.tsx
import { View } from 'react-native';

export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 ${className}`}>
        {children}
    </View>
);