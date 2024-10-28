import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import profile from "@/assets/profile.png";
import CustomButton from "./CustomButton";
import { Ionicons } from "@expo/vector-icons";
import FormField from "./FormField";
import * as ImagePicker from "expo-image-picker";

interface ProfileProps {
  setOpenEdit: any;
  openEdit: boolean;
}

const ProfileEdit = ({ setOpenEdit, openEdit }: ProfileProps) => {
  const handleEditOpen = () => {
    setOpenEdit(false);
  };
  const [form, setform] = useState({
    fullName: "John Doe",
    email: "johndoe1@gmail.com",
    username: "johndoe1",
  });
  const [imageSelected, setImageSelected] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted == false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access your photos."
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageSelected(result.assets[0]);
    }
  };
  return (
    <View className="w-full justify-center items-center px-4 my-6 h-[80vh]">
      <Text className="text-3xl text-white font-bold text-center">
        Edit Profile
      </Text>

      <View className="relative">
        <Image
          source={imageSelected ? { uri: imageSelected.uri } : profile}
          className="w-[130px] h-[130px] rounded-full mt-7 border border-white "
        />
        <TouchableOpacity
          className="absolute bottom-0 right-0 rounded-full bg-gray-200 m-1"
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={pickImage}
        >
          <Ionicons className="" name="camera" size={25} color={"black"} />
        </TouchableOpacity>
      </View>
      <FormField
        title=""
        value={form.fullName}
        handleChange={(e: any) => {
          setform({
            ...form,
            fullName: e,
          });
        }}
        otherStyles="mt-7"
        placeholder="Full Name"
      />
      <FormField
        title=""
        value={form.username}
        handleChange={(e: any) => {
          setform({
            ...form,
            username: e,
          });
        }}
        otherStyles=""
        placeholder="Username"
      />
      <FormField
        title=""
        value={form.email}
        handleChange={(e: any) => {
          setform({
            ...form,
            email: e,
          });
        }}
        otherStyles=""
        placeholder="Email"
      />
      <CustomButton
        title="Update"
        handlePress={handleEditOpen}
        containerStyles="mt-7 w-full bg-secondary min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
      <CustomButton
        title="Cancel"
        handlePress={handleEditOpen}
        containerStyles="mt-3 w-full bg-red-500 min-h-[40px]"
        textStyles={"text-xl text-white font-semibold uppercase"}
      />
    </View>
  );
};

export default ProfileEdit;
