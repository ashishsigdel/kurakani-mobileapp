import { View, Text, StatusBar } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface TabBarProps {
  icon: any;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, name, focused }: TabBarProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Ionicons name={icon} size={24} color={focused ? "orange" : "gray"} />
      <Text
        className={
          focused
            ? "font-semibold text-orange-500"
            : "font-normal text-gray-400"
        }
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ffa001",
          tabBarInactiveTintColor: "#cdcde0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"chatbubble"} name={"Chat"} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="request"
          options={{
            title: "Request",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"people"} name={"Request"} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"person"} name={"Profile"} focused={focused} />
            ),
          }}
        />
      </Tabs>
      <StatusBar barStyle={"light-content"} />
    </>
  );
};

export default TabLayout;
