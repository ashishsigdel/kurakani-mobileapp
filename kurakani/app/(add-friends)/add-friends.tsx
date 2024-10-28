import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SearchField from "@/components/SearchField";
import AddFriendCard from "@/components/AddFriendCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const AddFriends = () => {
  const [form, setForm] = useState({
    search: "",
  });
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <View className="w-full flex-row items-center justify-between mt-4 border-b border-white/20 pb-1 px-3">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={25} color={"gray"} />
        </TouchableOpacity>
        <Text className="text-2xl text-white font-bold text-center flex-1 mb-1">
          Find Friends
        </Text>
      </View>
      <ScrollView className="py-1 px-2">
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
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
        <AddFriendCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFriends;
