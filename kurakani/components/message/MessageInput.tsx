import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface MessageInputProps {
  message: string;
  setMessage: any;
  handleSend: () => void;
}
const MessageInput = ({
  message,
  setMessage,
  handleSend,
}: MessageInputProps) => {
  const handleChange = (e: any) => {
    setMessage(e);
  };
  return (
    <View className={`flex-1 flex-row items-center px-2`}>
      <TextInput
        className="flex-1 text-white font-semibold text-base bg-black/10 border-2 border-white/10 rounded-2xl px-4 py-[6px]"
        value={message}
        placeholder="Message"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChange}
      />
      <TouchableOpacity onPress={handleSend} className="h-5 w-5 ml-2">
        <Ionicons name="send" size={24} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
