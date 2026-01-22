import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function Home() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-50 p-6">
            <View className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 items-center w-full">
                <Text className="text-4xl mb-2">🇬🇧</Text>
                <Text className="text-2xl font-bold text-slate-900">Bank Holiday App</Text>
                <Text className="text-slate-500 text-center mt-2 mb-6">
                    NativeWind is working if this card is white and rounded!
                </Text>

                <Link href="/edit/test-id" asChild>
                    <TouchableOpacity className="bg-blue-600 px-8 py-4 rounded-2xl w-full items-center">
                        <Text className="text-white font-semibold text-lg">Test Navigation</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}