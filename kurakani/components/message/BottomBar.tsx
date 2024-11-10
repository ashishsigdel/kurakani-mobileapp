import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import MessageInput from "./MessageInput";

interface BottomBarProps {
  pickImage: any;
  message: string;
  setMessage: any;
  handleSend: () => void;
}
const BottomBar = ({
  pickImage,
  message,
  setMessage,
  handleSend,
}: BottomBarProps) => {
  return (
    <View className="w-full flex-row items-center space-x-2 pt-2 pb-1 border-t border-white/5 px-3 h-[68px] relative bottom-0">
      <View className="flex-row items-center space-x-3">
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 ml-3">
        <MessageInput
          message={message}
          setMessage={setMessage}
          handleSend={handleSend}
        />
      </View>
    </View>
  );
};

export default BottomBar;
