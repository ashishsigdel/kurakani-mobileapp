import { View, Text, Image, Alert } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { Link, router } from "expo-router";
import { User } from "@/types/User";
import { myAxios } from "@/helper/apiServices";
import { useSocket } from "@/helper/SocketProvider";

interface AddFriendCardProps {
  user: User;
  updateConnectionStatus: (userId: string, newStatus: string | null) => void;
}

const AddFriendCard: React.FC<AddFriendCardProps> = ({
  user,
  updateConnectionStatus,
}) => {
  const handleRequestToggle = async () => {
    try {
      if (user.connectionStatus === "sent") {
        // Cancel request
        await myAxios.post(`/connection/send-request?receiverId=${user.id}`);
        updateConnectionStatus(user.id, null);
      } else {
        // Send request
        await myAxios.post(`/connection/send-request?receiverId=${user.id}`);
        updateConnectionStatus(user.id, "sent");
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };

  const renderButton = () => {
    switch (user.connectionStatus) {
      case "sent":
        return (
          <CustomButton
            title="Cancel"
            handlePress={handleRequestToggle}
            containerStyles="bg-red-500 px-3 py-2"
            textStyles="text-white font-semibold"
            isLoading={false}
          />
        );
      case "received":
        return (
          <CustomButton
            title="Respond"
            handlePress={() => router.push("/request")}
            containerStyles="bg-secondary px-3 py-2"
            textStyles="text-white font-semibold"
            isLoading={false}
          />
        );
      case "connected":
        return null;
      default:
        return (
          <CustomButton
            title="Connect"
            handlePress={handleRequestToggle}
            containerStyles="bg-secondary px-3 py-2"
            textStyles="text-white font-semibold"
            isLoading={false}
          />
        );
    }
  };

  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(user?.id.toString());

  return (
    <View className="py-4 px-2 flex-row items-center justify-between border-b border-white/10">
      <Link href={`/profile/${user?.id}`}>
        <View className="flex-row items-center space-x-2">
          <View className="relative">
            <Image
              width={10}
              height={10}
              source={user.profilePic ? { uri: user.profilePic } : profile}
              className="w-[60px] h-[60px] rounded-full"
            />
            {isOnline && user.connectionStatus === "connected" && (
              <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></View>
            )}
          </View>
          <View className="">
            <Text className="text-[18px] text-white font-semibold mb-1">
              {user.fullName}
            </Text>
            <Text className="text-[12px] text-gray-200 font-semibold mb-1">
              @{user.username}
            </Text>
          </View>
        </View>
      </Link>
      {renderButton()}
    </View>
  );
};

export default AddFriendCard;
