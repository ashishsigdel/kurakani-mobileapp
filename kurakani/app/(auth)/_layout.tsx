import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/helper/GlobalProvider";
import { GuestProvider } from "@/helper/GuestProvider";

const AuthLayout = () => {
  const { user, loading } = useAuth();

  if (!loading && user) return <Redirect href={"/chat"} />;
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
