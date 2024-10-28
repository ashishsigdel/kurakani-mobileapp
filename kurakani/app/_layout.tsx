import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        <Stack.Screen name="(add-friends)" options={{ headerShown: false }} />
        <Stack.Screen
          name="message/[chatId]"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
