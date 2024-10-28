import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

const signup = () => {
  const [form, setform] = useState({
    fullName: "",
    email: "",
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
              Sign Up
            </Text>
            <FormField
              title="FullName*"
              value={form.fullName}
              handleChange={(e: any) =>
                setform({
                  ...form,
                  fullName: e,
                })
              }
              otherStyles="mt-7"
              placeholder="Enter your full name..."
            />
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
              title={"Sign Up"}
              handlePress={() => {
                router.push("/signin");
              }}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
            <View className="justify-center items-center pt-5 flex-row gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Already have an account?{" "}
                <Link className="text-secondary font-bold" href={"/signin"}>
                  Sign In
                </Link>{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signup;
