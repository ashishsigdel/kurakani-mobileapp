import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/helper/GlobalProvider";
import { GuestProvider } from "@/helper/GuestProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthLayout = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) return <Redirect href={"/chat"} />;
    };
    checkAuth();
  }, []);

  return (
    <GuestProvider>
      <Stack>
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reset"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="confirm-otp"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar barStyle={"light-content"} />
    </GuestProvider>
  );
};

export default AuthLayout;
