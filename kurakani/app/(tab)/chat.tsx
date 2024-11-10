import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SearchField from "@/components/SearchField";
import ChatUser from "@/components/ChatUser";
import { Link, router, useFocusEffect } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import CustomButton from "@/components/CustomButton";
import { useSocket } from "@/helper/SocketProvider";

let searchTimeout: NodeJS.Timeout;

const chat = () => {
  const [form, setForm] = useState({
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { socket } = useSocket();

  const fetchConnections = async (searchQuery: string = "") => {
    setIsLoading(true);
    try {
      const response = await myAxios.get(
        `/connection/get?search=${searchQuery ? searchQuery : ""}`
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
        fetchConnections(form.search);
      }, 500);
    } else {
      fetchConnections();
    }

    return () => clearTimeout(searchTimeout);
  }, [form.search]);

  useFocusEffect(
    useCallback(() => {
      if (form.search.trim() === "") {
        fetchConnections();
      }
    }, [])
  );

  useEffect(() => {
    socket.on("newMessage", (newMessage: any) => {
      fetchConnections();
    });
  }, [socket]);

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
        {form.search.length > 0 && users.length === 0 && (
          <View className="items-center mt-4 h-[50vh] justify-center">
            <Text className="text-white text-center text-lg mt-10">
              No User found!
            </Text>
          </View>
        )}
        {users.length === 0 && (
          <View className="items-center mt-4 h-[50vh] justify-center">
            <Text className="text-white text-center text-lg mt-10">
              Please Connect with friend to start Chat!
            </Text>
            <CustomButton
              title="Find Friends"
              handlePress={() => {
                router.push("/add-friends");
              }}
              containerStyles="mt-7 px-5 bg-secondary min-h-[40px]"
              textStyles={"text-xl text-white font-semibold uppercase"}
            />
          </View>
        )}
        {users.map((user: any) => (
          <Link
            key={user.id}
            className="w-full"
            href={`/message/${user.conversationId}`}
          >
            <ChatUser connection={user} />
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default chat;
