import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const resetPassword = () => {
  const [form, setform] = useState({
    password: "",
    confirmPassword: "",
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
              handlePress={() => {
                router.push("/signin");
              }}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default resetPassword;
