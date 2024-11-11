import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import logo from "@/assets/logo.png";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { useAuth } from "@/helper/GlobalProvider";

const signin = () => {
  const { signIn } = useAuth();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    try {
      const response = await myAxios.post("/auth/login", form);

      if (!response) return;
      const { accessToken, user } = response.data.data;

      if (!accessToken && !user) {
        Alert.alert("Error", "Cannot create session!");
        return;
      }

      //save accesstoken and user in local storage
      signIn(accessToken, user)
        .then(() => {
          router.push("/chat");
        })
        .catch((error) => {
          Alert.alert("Error!", "Something went wrong!");
        });
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.data) {
        Alert.alert("Error!", error.response.data.message);
      }
      Alert.alert("Error!", "Something went wrong!");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
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
              handlePress={handleSignin}
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
