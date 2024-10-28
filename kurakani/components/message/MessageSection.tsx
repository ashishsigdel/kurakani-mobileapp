import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import messages from "@/data/message.json";
import profile from "@/assets/profile.png";
import { Ionicons } from "@expo/vector-icons";

interface MessageType {
  id: number;
  isSendByMe: boolean;
  message: string;
  mediaURL?: string;
}

interface MessageSectionProps {
  selectedImage: any;
  setSelectdImage: any;
}
const MessageSection = ({
  selectedImage,
  setSelectdImage,
}: MessageSectionProps) => {
  const handleRemove = () => {
    setSelectdImage([]);
  };

  return (
    <View>
      {messages.map((message: MessageType) => (
        <View
          className={`w-full py-3 mb-3 px-3 flex-row space-x-2 ${
            message.isSendByMe ? "justify-end" : "justify-start"
          }`}
          key={message.id}
        >
          {!message.isSendByMe && (
            <Image
              source={profile}
              className="w-[32px] h-[32px] rounded-full"
            />
          )}

          <View className={`max-w-[70%]`}>
            {message.mediaURL && (
              <>
                <Image
                  source={{ uri: message.mediaURL }}
                  className="w-[150px] h-[150px] object-cover"
                />
              </>
            )}
            {message.message && (
              <View
                className={`${
                  message.isSendByMe
                    ? "bg-blue-500 px-3 py-2 rounded-lg"
                    : "bg-gray-500 px-3 py-2 rounded-lg"
                }`}
              >
                <Text className="text-[16px] text-white font-semibold">
                  {message.message}
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
      <>
        {selectedImage.length > 0 && (
          <View className="mb-3 justify-end w-full flex-row px-3 relative">
            <Image
              source={{
                uri: selectedImage[0].uri,
              }}
              className="h-[100px] w-[100px] object-cover "
            />
            <TouchableOpacity
              onPress={handleRemove}
              className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center absolute"
            >
              <Ionicons
                className="absolute top-0 right-0"
                name="close"
                size={24}
                color={"black"}
              />
            </TouchableOpacity>
          </View>
        )}
      </>
    </View>
  );
};

export default MessageSection;
