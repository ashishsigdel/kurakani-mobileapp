import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AddFriendLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="add-friends"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default AddFriendLayout;
