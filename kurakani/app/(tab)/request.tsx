import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RequestUser from "@/components/RequestUser";

const request = () => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full flex-row items-center justify-between mt-4 border-b border-white/20 pb-1 px-3">
        <Text className="text-2xl text-white font-semibold text-center flex-1 mb-1">
          Requests
        </Text>
        <Link href={"/add-friends"}>
          <Ionicons name="person-add" size={24} color={"white"} />
        </Link>
      </View>
      <ScrollView>
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
        <RequestUser />
      </ScrollView>
    </SafeAreaView>
  );
};

export default request;
