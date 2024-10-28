import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import SearchField from "@/components/SearchField";
import ChatUser from "@/components/ChatUser";
import { Link } from "expo-router";

const chat = () => {
  const [form, setForm] = useState({
    search: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full items-center mt-4 border-b border-white/5 pb-1">
        <Text className="text-2xl text-white font-bold">Chats</Text>
      </View>
      <ScrollView className="py-1 px-2 w-full">
        <SearchField
          value={form.search}
          handleChange={(e: any) =>
            setForm({
              search: e,
            })
          }
          placeholder="Search friends..."
          otherStyles="mt-2 mb-4"
        />
        <Link className="w-full" href={"/message/1"}>
          <ChatUser />
        </Link>
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
        <ChatUser />
      </ScrollView>
    </SafeAreaView>
  );
};

export default chat;
