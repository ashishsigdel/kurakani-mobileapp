import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { useGuest } from "@/helper/GuestProvider";

const confirmOTP = () => {
  const { email, resetToken, verifyOtp, sendOtp } = useGuest();

  if (!email || !resetToken) {
    router.push("/reset");
    return;
  }
  const [form, setform] = useState({
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmOtp = async () => {
    setIsLoading(true);
    try {
      const formData = {
        otp: form.otp,
        resetToken: resetToken,
      };
      const response = await myAxios.post("reset-password/verify", formData);

      verifyOtp(email, resetToken, form.otp)
        .then(() => {
          router.push("/reset-password");
        })
        .catch((error) => {
          Alert.alert("Error!", error.message);
        });
    } catch (error: any) {
      if (error.response) {
        Alert.alert("Error!", error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.post("reset-password/send", {
        email: email,
      });
      const resetToken = response.data.data.resetToken;

      sendOtp(email, resetToken)
        .then(() => {
          Alert.alert("Success", "OTP sent successfully");
        })
        .catch((error: any) => {
          Alert.alert("Error!", error.message);
        });
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
      <ScrollView>
        <View className="min-h-screen">
          <View className="h-[90vh] w-full justify-center items-center px-4 my-6">
            <Image
              source={logo}
              className="w-[130px]  h-[130px]"
              resizeMode="contain"
            />
            <Text className="text-3xl text-white font-bold text-center">
              Enter your OTP
            </Text>
            <FormField
              title="OTP*"
              value={form.otp}
              handleChange={(e: any) =>
                setform({
                  ...form,
                  otp: e,
                })
              }
              otherStyles="mt-7"
              placeholder="Enter your OTP..."
            />

            <CustomButton
              title={"Verify OTP"}
              handlePress={handleConfirmOtp}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
            <View className="justify-center items-center pt-5 flex-row gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Does't Received OTP?{" "}
                <TouchableOpacity onPress={handleResendOtp}>
                  <Text className="text-secondary font-bold">Resend</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default confirmOTP;
