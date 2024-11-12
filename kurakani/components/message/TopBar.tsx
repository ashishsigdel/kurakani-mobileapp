import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { User } from "@/types/User";
import { useSocket } from "@/helper/SocketProvider";

interface TopBarProps {
  chatUser: User | null;
}
const TopBar: React.FC<TopBarProps> = ({ chatUser }) => {
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(chatUser?.id.toString());

  return (
    <View className="w-full flex-row items-center space-x-2 pt-2 pb-3 border-b border-white/5 px-3 h-[58px] relative top-0">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" color={"gray"} size={24} />
      </TouchableOpacity>

      <Pressable
        onPress={() => router.push(`/profile/${chatUser?.id}`)}
        className="flex-row items-center justify-center gap-5"
      >
        <View className="relative">
          <Image
            source={
              chatUser?.profilePic ? { uri: chatUser.profilePic } : profile
            }
            className="w-[40px] h-[40px] rounded-full"
          />
          {isOnline && (
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></View>
          )}
        </View>
        <Text className="text-[20px] text-white font-bold text-center ">
          {chatUser?.fullName}
        </Text>
      </Pressable>
    </View>
  );
};

export default TopBar;
