import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useGuest } from "@/helper/GuestProvider";
import { myAxios } from "@/helper/apiServices";

const resetPassword = () => {
  const { email, resetToken, verifyOtp, sendOtp, otp, resetAll } = useGuest();

  if (!email || !resetToken || !otp) {
    router.push("/reset");
    return;
  }
  const [form, setform] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChangepassword = async () => {
    setIsLoading(true);
    try {
      const formData = {
        otp: otp,
        resetToken: resetToken,
        password: form.password,
        confirmPassword: form.confirmPassword,
      };
      const response = await myAxios.post("reset-password/change", formData);

      Alert.alert("Success", "Password Changed.");
      router.push("/signin");
      resetAll();
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust as needed
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View className="min-h-screen">
            <View className="h-[90vh] w-full justify-center items-center px-4 my-6">
              <Image
                source={logo}
                className="w-[130px]  h-[130px]"
                resizeMode="contain"
              />
              <Text className="text-3xl text-white font-bold text-center">
                Enter new password
              </Text>

              <FormField
                title="Password*"
                value={form.password}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    password: e,
                  })
                }
                otherStyles="mt-5"
                placeholder="Enter your password..."
              />
              <FormField
                title="Confirm Password*"
                value={form.confirmPassword}
                handleChange={(e: any) =>
                  setform({
                    ...form,
                    confirmPassword: e,
                  })
                }
                otherStyles="mt-5"
                placeholder="Re-enter your password..."
              />

              <CustomButton
                title={"Change Password"}
                handlePress={handleChangepassword}
                containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
                textStyles={"text-xl text-white font-semibold uppercase"}
                isLoading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default resetPassword;
