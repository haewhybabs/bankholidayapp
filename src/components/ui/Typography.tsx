// src/components/ui/Typography.tsx
import { Text } from 'react-native';

export const Label = ({ children }: { children: string }) => (
    <Text className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-2">
        {children}
    </Text>
);

export const Heading = ({ children }: { children: string }) => (
    <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
        {children}
    </Text>
);