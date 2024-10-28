import { View, Text, Image } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";

const RequestUser = () => {
  return (
    <View className="py-4 px-4 flex-row items-center justify-between border-b border-white/10">
      <View className="flex-row items-center space-x-5">
        <Image source={profile} className="w-[60px] h-[60px] rounded-full" />
        <View className="flex-1">
          <Text className="text-[18px] text-white font-semibold mb-1">
            John Doe
          </Text>
          <Text className="text-[12px] text-gray-200 font-semibold mb-0.5">
            John wants to connect you.
          </Text>
          <Text className="text-[12px] text-gray-400 font-semibold mb-1">
            2 days ago
          </Text>
          <View className="flex-row mt-3">
            <View className="flex-1 mr-2">
              <CustomButton
                title="Accept"
                handlePress={() => null}
                containerStyles="bg-secondary px-3 py-2"
                textStyles="text-primary font-semibold"
                isLoading={false}
              />
            </View>
            <View className="flex-1">
              <CustomButton
                title="Reject"
                handlePress={() => null}
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
