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
import { myAxios } from "@/helper/apiServices";

const signup = () => {
  const [form, setform] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.post("/auth/register", form);
      Alert.alert("Info!", "You have been registered.");
      setform({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/signin");
    } catch (error: any) {
      console.log(error?.response);

      if (!error.response.data.message) {
        Alert.alert("Error!", "Something went wrong!");
      }
      Alert.alert("Error!", error?.response?.data?.message);
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
                title={isLoading ? "Loading..." : "Sign Up"}
                handlePress={handleSignUp}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default signup;
