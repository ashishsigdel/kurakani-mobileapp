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

const signin = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="min-h-screen">
          <View className="h-[70vh] w-full justify-center items-center px-4 my-6">
            <Image
              source={logo}
              className="w-[130px]  h-[130px]"
              resizeMode="contain"
            />
            <Text className="text-3xl text-white font-bold text-center">
              Sign In
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
            <View className="w-full justify-end flex-row items-center pt-2 gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Forgot your password?{" "}
                <Link className="text-secondary font-bold" href={"/reset"}>
                  Reset Now
                </Link>
              </Text>
            </View>
            <CustomButton
              title={"Sign In"}
              handlePress={() => {
                router.push("/chat");
              }}
              containerStyles={"py-2 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={isLoading}
            />
            <View className="justify-center items-center pt-5 flex-row gap-2">
              <Text className="text-base text-gray-100 font-normal">
                Don't have an account?{" "}
                <Link className="text-secondary font-bold" href={"/signup"}>
                  Sign Up
                </Link>{" "}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signin;
