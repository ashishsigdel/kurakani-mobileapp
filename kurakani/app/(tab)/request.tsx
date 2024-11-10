import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, router, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import RequestUser from "@/components/RequestUser";
import { myAxios } from "@/helper/apiServices";
import { User } from "@/types/User";
import CustomButton from "@/components/CustomButton";

const request = () => {
  const [requestUsers, setRequestUsers] = useState([]);
  const fetchRequests = async () => {
    try {
      const response = await myAxios.get("/connection/get-requests");
      setRequestUsers(response.data.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchRequests();
    }, [])
  );

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
        {requestUsers.length === 0 ? (
          <View className="items-center mt-4 h-[50vh] justify-center">
            <Text className="text-white text-center text-lg mt-10">
              Does not Received any connection request.
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
        ) : (
          <>
            {requestUsers.map((request: any) => (
              <RequestUser
                key={request.id}
                request={request}
                requestUsers={requestUsers}
                setRequestUsers={setRequestUsers}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default request;
