import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const confirmOTP = () => {
  const [form, setform] = useState({
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
              handlePress={() => {
                router.push("/reset-password");
              }}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
            <View className="justify-center items-center pt-5 flex-row gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Does't Received OTP?{" "}
                <Link
                  className="text-secondary font-bold"
                  href={"/confirm-otp"}
                >
                  Resend
                </Link>{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default confirmOTP;
