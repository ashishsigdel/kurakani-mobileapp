import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const reset = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <View className="min-h-screen">
          <View className="h-[70vh] w-full justify-center items-center px-4 my-6">
            <Image
              source={logo}
              className="w-[130px]  h-[130px]"
              resizeMode="contain"
            />
            <Text className="text-3xl text-white font-bold text-center">
              Reset Password
            </Text>
            <FormField
              title="Email*"
              value={form.email}
              handleChange={(e: any) =>
                setform({
                  ...form,
                  email: e,
                })
              }
              otherStyles="mt-7"
              placeholder="Enter your email..."
            />

            <CustomButton
              title={"Send OTP"}
              handlePress={() => {
                router.push("/confirm-otp");
              }}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
            <View className="justify-center items-center pt-5 flex-row gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Remember Password?{" "}
                <Link className="text-secondary font-bold" href={"/signin"}>
                  Sign In
                </Link>{" "}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default reset;
