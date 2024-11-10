import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { User } from "@/types/User";

interface TopBarProps {
  chatUser: User | null;
}
const TopBar: React.FC<TopBarProps> = ({ chatUser }) => {
  return (
    <View className="w-full flex-row items-center space-x-2 pt-2 pb-3 border-b border-white/5 px-3 h-[58px] relative top-0">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"gray"} size={24} />
      </TouchableOpacity>
      <View className="flex-row items-center justify-center gap-5">
        <Image
          source={chatUser?.profilePic ? { uri: chatUser.profilePic } : profile}
          className="w-[40px] h-[40px] rounded-full"
        />
        <Text className="text-[20px] text-white font-bold text-center ">
          {chatUser?.fullName}
        </Text>
      </View>
    </View>
  );
};

export default TopBar;
