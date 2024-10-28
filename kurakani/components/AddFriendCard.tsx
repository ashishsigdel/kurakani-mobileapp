import { View, Text, Image } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { Link } from "expo-router";

const AddFriendCard = () => {
  return (
    <View className="py-4 px-2 flex-row items-center justify-between border-b border-white/10">
      <View className="flex-row items-center space-x-2">
        <Image source={profile} className="w-[60px] h-[60px] rounded-full" />
        <View className="">
          <Text className="text-[18px] text-white font-semibold mb-1">
            John Doe
          </Text>
          <Text className="text-[12px] text-gray-200 font-semibold mb-1">
            @johndoe1
          </Text>
        </View>
      </View>
      <CustomButton
        title="Connect"
        handlePress={() => null}
        containerStyles="bg-secondary px-3 py-2"
        textStyles="text-white font-semibold"
        isLoading={false}
      />
      {/* <CustomButton
        title="Cancel"
        handlePress={() => null}
        containerStyles="bg-red-500 px-3 py-2"
        textStyles="text-white font-semibold"
        isLoading={false}
      /> */}
    </View>
  );
};

export default AddFriendCard;
