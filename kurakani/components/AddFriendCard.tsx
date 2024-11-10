import { View, Text, Image, Alert } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { Link } from "expo-router";
import { User } from "@/types/User";
import { myAxios } from "@/helper/apiServices";

interface AddFriendCardProps {
  user: User;
  sentRequests: any;
  setSentRequests: any;
}
const AddFriendCard: React.FC<AddFriendCardProps> = ({
  user,
  sentRequests,
  setSentRequests,
}) => {
  const handleRequestToggle = async () => {
    try {
      if (sentRequests.includes(user.id)) {
        // reject
        const response = await myAxios.post(
          `/connection/send-request?receiverId=${user.id}`
        );
        setSentRequests(sentRequests.filter((id: number) => id !== user.id));
        return;
      }
      const response = await myAxios.post(
        `/connection/send-request?receiverId=${user.id}`
      );
      setSentRequests([...sentRequests, user.id]);
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };
  return (
    <View className="py-4 px-2 flex-row items-center justify-between border-b border-white/10">
      <View className="flex-row items-center space-x-2">
        <Image
          width={10}
          height={10}
          source={user.profilePic ? { uri: user.profilePic } : profile}
          className="w-[60px] h-[60px] rounded-full"
        />
        <View className="">
          <Text className="text-[18px] text-white font-semibold mb-1">
            {user.fullName}
          </Text>
          <Text className="text-[12px] text-gray-200 font-semibold mb-1">
            @{user.username}
          </Text>
        </View>
      </View>
      {sentRequests.includes(user.id) ? (
        <CustomButton
          title="Cancel"
          handlePress={handleRequestToggle}
          containerStyles="bg-red-500 px-3 py-2"
          textStyles="text-white font-semibold"
          isLoading={false}
        />
      ) : (
        <CustomButton
          title="Connect"
          handlePress={handleRequestToggle}
          containerStyles="bg-secondary px-3 py-2"
          textStyles="text-white font-semibold"
          isLoading={false}
        />
      )}
    </View>
  );
};

export default AddFriendCard;
