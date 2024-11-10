import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";
import logo from "@/assets/logo.png";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@/helper/GlobalProvider";

const index = () => {
  const { user, loading } = useAuth();

  if (!loading && user) return <Redirect href={"/chat"} />;
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center h-full px-4">
            <Image source={logo} className="w-[130px] h-[130px]" />
            <Text className="text-2xl text-white font-bold text-center">
              Connect, Chat, Share Instantly with{" "}
            </Text>
            <Text className="text-2xl text-secondary font-bold text-center">
              KuraKani
            </Text>
            <CustomButton
              title={"Sign In"}
              handlePress={() => {
                router.push("/signin");
              }}
              containerStyles={"py-1 px-3 bg-secondary w-full mt-7"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={false}
            />
            <CustomButton
              title={"Sign Up"}
              handlePress={() => {
                router.push("/signup");
              }}
              containerStyles={"py-1 px-3 bg-secondary w-full my-5"}
              textStyles={"text-xl text-white font-semibold uppercase"}
              isLoading={false}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default index;
