import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchField from "@/components/SearchField";
import AddFriendCard from "@/components/AddFriendCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { User } from "@/types/User";

let searchTimeout: NodeJS.Timeout;

const AddFriends = () => {
  const [form, setForm] = useState({
    search: "",
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState([]);

  const fetchUsers = async (searchQuery: string = "") => {
    setIsLoading(true);
    try {
      const response = await myAxios.get(
        `/user/find-friends?search=${searchQuery ? searchQuery : ""}`
      );
      setUsers(response.data.data);
    } catch (error: any) {
      console.log(error.response);

      if (error.response) {
        console.log(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (form.search.trim() !== "") {
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        fetchUsers(form.search);
      }, 500);
    } else {
      fetchUsers();
    }

    return () => clearTimeout(searchTimeout);
  }, [form.search]);
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
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          users.map((user: User) => (
            <AddFriendCard
              key={user.id}
              user={user}
              sentRequests={sentRequests}
              setSentRequests={setSentRequests}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFriends;
