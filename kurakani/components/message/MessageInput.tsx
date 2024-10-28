import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const MessageInput = () => {
  const handleChange = () => {};
  return (
    <View className={`flex-1 flex-row items-center px-2`}>
      <TextInput
        className="flex-1 text-white font-semibold text-base bg-black/10 border-2 border-white/10 rounded-2xl px-4 py-[6px]"
        value={""}
        placeholder="Message"
        placeholderTextColor="#7b7b8b"
        onChange={handleChange}
      />
      <TouchableOpacity className="h-5 w-5 ml-2">
        <Ionicons name="send" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
