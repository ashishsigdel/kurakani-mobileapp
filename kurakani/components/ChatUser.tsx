import { View, Text, Image } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";

const ChatUser = () => {
  return (
    <View className="py-4 px-2 flex-row items-center justify-between border-b border-white/10 w-full">
      <View className="flex-row items-center space-x-4 w-full">
        <View className="relative">
          <Image source={profile} className="w-[60px] h-[60px] rounded-full" />
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></View>
        </View>
        <View className="">
          <Text className="text-[18px] text-white/90 font-semibold mb-1">
            John Doe
          </Text>
          <Text className="text-[12px] text-gray-400 font-semibold mb-1">
            2 days ago
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatUser;
