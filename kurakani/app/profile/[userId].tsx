import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { User } from "@/types/User";
import profile from "@/assets/profile.png";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSocket } from "@/helper/SocketProvider";

const UserProfile = () => {
  const { userId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any | null>(null);

  const { onlineUsers } = useSocket();

  const isOnline =
    onlineUsers.includes(userData?.user?.id.toString()) &&
    userData?.connectionStatus === "connected";

  const fetchUser = async () => {
    try {
      const response = await myAxios.get(`/user/get/${userId}`);
      setUserData(response.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, []);

  const handleRequestToggle = async () => {
    try {
      if (userData.connectionStatus === "sent") {
        // Cancel request
        await myAxios.post(`/connection/send-request?receiverId=${userId}`);
        fetchUser();
      } else {
        // Send request

        await myAxios.post(`/connection/send-request?receiverId=${userId}`);
        fetchUser();
      }
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full flex-row items-center justify-between border-b border-white/20 pb-1 px-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={"gray"} />
        </TouchableOpacity>
        <Text className="text-2xl text-white font-bold text-center flex-1 mb-1">
          Profile
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <View className="w-full justify-center items-center px-4 my-6">
          <View className="relative">
            <Image
              source={
                userData?.user?.profilePic
                  ? { uri: userData?.user.profilePic }
                  : profile
              }
              className="w-[130px] h-[130px] rounded-full mt-7 border border-white "
            />
            {isOnline && (
              <View className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></View>
            )}
          </View>
          <Text className="mt-7 text-3xl text-secondary font-semibold">
            {userData?.user?.fullName}
          </Text>
          <Text className="mt-1 text-base text-gray-100 font-semibold">
            @{userData?.user?.username}
          </Text>
          <Text className="mt-1 text-base text-gray-100 font-semibold">
            {userData?.user?.email}
          </Text>
          {userData?.connectionStatus === "connected" && (
            <View className="flex-row mt-3 w-full px-6">
              <View className="flex-1 mr-2">
                <View className="bg-gray-500 px-3 py-2 rounded-xl justify-center items-center w-full flex-row space-x-2">
                  <Ionicons name="checkmark" size={18} color={"white"} />
                  <Text className="text-white font-semibold">Connected</Text>
                </View>
              </View>
              <View className="flex-1 ml-2">
                <Link href={`/message/${userData?.chatId}`} asChild>
                  <TouchableOpacity className="bg-secondary px-3 py-2 rounded-xl justify-center items-center w-full">
                    <Text className="text-white font-semibold">Message</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )}
          {userData?.connectionStatus === "received" && (
            <View className="mt-3 w-full px-3">
              <Text className="my-2 text-orange-300 font-semibold ">
                {userData.user.fullName.split(" ")[0]} send you a connection
                request.
              </Text>
              <CustomButton
                title="Respond"
                containerStyles="bg-secondary px-3 py-2 rounded-xl justify-center items-center w-full flex-row space-x-2"
                textStyles="text-white font-semibold"
                handlePress={() => router.push("/request")}
                iconname={"checkmark"}
              />
            </View>
          )}
          {userData?.connectionStatus === "sent" && (
            <View className="mt-3 w-full px-3">
              <Text className="my-2 text-orange-300 font-semibold ">
                You send you a connection request.
              </Text>
              <CustomButton
                title="Cancel Request"
                containerStyles="bg-red-500 px-3 py-2 rounded-xl justify-center items-center w-full flex-row space-x-2"
                textStyles="text-white font-semibold"
                handlePress={handleRequestToggle}
                iconname={"close"}
              />
            </View>
          )}
          {!userData?.connectionStatus && (
            <View className="mt-3 w-full px-3">
              <CustomButton
                title="Send Request"
                containerStyles="bg-secondary px-3 py-2 rounded-xl justify-center items-center w-full flex-row space-x-2"
                textStyles="text-white font-semibold"
                handlePress={handleRequestToggle}
                iconname={"checkmark"}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfile;
