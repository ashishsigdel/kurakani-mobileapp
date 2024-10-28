import { View, Text, Image } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

interface ProfileProps {
  setOpenEdit: any;
  openEdit: boolean;
}

const Profile = ({ setOpenEdit, openEdit }: ProfileProps) => {
  const handleEditOpen = () => {
    setOpenEdit(true);
  };
  return (
    <View className="w-full justify-center items-center px-4 my-6 h-[80vh]">
      <Text className="text-3xl text-white font-bold text-center">Profile</Text>
      <Image
        source={profile}
        className="w-[130px] h-[130px] rounded-full mt-7 border border-white "
      />
      <Text className="mt-7 text-3xl text-secondary font-semibold">
        John Doe
      </Text>
      <Text className="mt-1 text-base text-gray-100 font-semibold">
        @johndoe1
      </Text>
      <Text className="mt-1 text-base text-gray-100 font-semibold">
        johndoe1@gmail.com
      </Text>
      <CustomButton
        title="Edit Profile"
        handlePress={handleEditOpen}
        containerStyles="mt-7 w-full bg-secondary min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
      <CustomButton
        title="Sign Out"
        handlePress={() => router.push("/signin")}
        containerStyles="mt-3 w-full bg-red-500 min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
    </View>
  );
};

export default Profile;
