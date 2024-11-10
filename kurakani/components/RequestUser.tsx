import { View, Text, Image, Alert } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { User } from "@/types/User";
import { formatDistanceToNow } from "date-fns";
import { myAxios } from "@/helper/apiServices";

interface RequestUserProps {
  request: any;
  requestUsers: any;
  setRequestUsers: any;
}
const RequestUser: React.FC<RequestUserProps> = ({
  request,
  requestUsers,
  setRequestUsers,
}) => {
  const timeAgo = formatDistanceToNow(new Date(request.createdAt), {
    includeSeconds: true,
    addSuffix: true,
  }).replace("about", "");

  const acceptRequest = async () => {
    try {
      const response = await myAxios.post(
        `/connection/accept-request?connectionRequestId=${request.id}`
      );
      setRequestUsers((prevRequests: any) =>
        prevRequests.filter((req: any) => req.id !== request.id)
      );
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };

  const rejectRequest = async () => {
    try {
      const response = await myAxios.post(
        `/connection/reject-request?connectionRequestId=${request.id}`
      );
      setRequestUsers((prevRequests: any) =>
        prevRequests.filter((req: any) => req.id !== request.id)
      );
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };

  return (
    <View className="py-4 px-4 flex-row items-center justify-between border-b border-white/10">
      <View className="flex-row items-center space-x-5">
        <Image
          source={
            request.sender.profilePic
              ? { uri: request.sender.profilePic }
              : profile
          }
          className="w-[60px] h-[60px] rounded-full"
        />
        <View className="flex-1">
          <Text className="text-[18px] text-white font-semibold mb-1">
            {request.sender.fullName}
          </Text>
          <Text className="text-[12px] text-gray-200 font-semibold mb-0.5">
            {request.sender.fullName
              ? request.sender.fullName.split(" ")[0]
              : request.sender.fullName}{" "}
            wants to connect you.
          </Text>
          <Text className="text-[12px] text-gray-400 font-semibold mb-1">
            {timeAgo}
          </Text>
          <View className="flex-row mt-3">
            <View className="flex-1 mr-2">
              <CustomButton
                title="Accept"
                handlePress={acceptRequest}
                containerStyles="bg-secondary px-3 py-2"
                textStyles="text-primary font-semibold"
                isLoading={false}
              />
            </View>
            <View className="flex-1">
              <CustomButton
                title="Reject"
                handlePress={rejectRequest}
                containerStyles="bg-red-500 px-3 py-2"
                textStyles="text-white font-semibold"
                isLoading={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RequestUser;
