import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

export const SkeletonLoader = () => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0.3, duration: 800, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    return (
        <View className="p-4">
            {/* Featured Card Skeleton */}
            <Animated.View style={{ opacity }} className="bg-slate-200 h-64 rounded-[40px] mb-8" />

            {[1, 2, 3].map((i) => (
                <Animated.View
                    key={i}
                    style={{ opacity }}
                    className="bg-slate-200 h-20 rounded-3xl mb-3 flex-row items-center px-4"
                >
                    <View className="bg-slate-300 w-10 h-10 rounded-xl mr-4" />
                    <View className="flex-1">
                        <View className="bg-slate-300 h-3 w-32 rounded mb-2" />
                        <View className="bg-slate-300 h-2 w-20 rounded" />
                    </View>
                </Animated.View>
            ))}
        </View>
    );
};