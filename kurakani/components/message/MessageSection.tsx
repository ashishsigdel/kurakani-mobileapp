import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import profile from "@/assets/profile.png";
import { Ionicons } from "@expo/vector-icons";
import { getLinkPreview } from "link-preview-js";

interface MessageType {
  id: number;
  isSendByme: boolean;
  message: string;
  mediaURL?: string;
}

interface LinkPreviewType {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

interface MessageSectionProps {
  selectedImage: any;
  setSelectdImage: any;
  chatMessages: any;
  isImageSending: boolean;
}

const LinkPreviewCard = ({ url }: { url: string }) => {
  const [preview, setPreview] = useState<LinkPreviewType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinkPreview = async () => {
      try {
        const data: any = await getLinkPreview(url);

        setPreview({
          title: data.title,
          description: data.description,
          image: data.images?.[0],
          url: url,
        });
      } catch (error) {
        console.log("Error fetching preview:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinkPreview();
  }, [url]);

  if (!preview) return null;

  return (
    <TouchableOpacity
      className="bg-gray-700 rounded-lg overflow-hidden mb-2 w-full"
      onPress={() => Linking.openURL(url)}
    >
      {preview.image && (
        <Image
          source={{ uri: preview.image }}
          className="w-full h-[120px]"
          resizeMode="cover"
        />
      )}
      <View className="p-2">
        <Text className="text-white font-semibold text-sm" numberOfLines={2}>
          {preview.title}
        </Text>
        {preview.description && (
          <Text className="text-gray-300 text-xs mt-1" numberOfLines={2}>
            {preview.description}
          </Text>
        )}
        <Text className="text-blue-400 text-xs mt-1" numberOfLines={1}>
          {url}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Function to detect URLs in text
const extractUrls = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

const MessageSection = ({
  selectedImage,
  setSelectdImage,
  chatMessages,
  isImageSending,
}: MessageSectionProps) => {
  const handleRemove = () => {
    setSelectdImage([]);
  };

  return (
    <View>
      {chatMessages.length === 0 && (
        <View className="items-center mt-4 h-[50vh] justify-center">
          <Text className="text-white text-center text-lg mt-10">
            No messages yet!
          </Text>
        </View>
      )}
      {chatMessages.map((message: MessageType) => (
        <View
          className={`w-full py-3 mb-3 px-3 flex-row space-x-2 ${
            message.isSendByme ? "justify-end" : "justify-start"
          }`}
          key={message.id}
        >
          {!message.isSendByme && (
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
                  message.isSendByme
                    ? "bg-blue-500 px-3 py-2 rounded-lg"
                    : "bg-gray-500 px-3 py-2 rounded-lg"
                }`}
              >
                <Text className="text-[16px] text-white font-semibold">
                  {message.message}
                </Text>
              </View>
            )}
            {/* Link Preview */}
            {extractUrls(message.message).map((url, index) => (
              <LinkPreviewCard key={index} url={url} />
            ))}
          </View>
        </View>
      ))}
      <>
        {selectedImage.length > 0 && (
          <View className="mb-3 justify-end w-full flex-row px-3 relative">
            <View className="relative">
              <Image
                source={{
                  uri: selectedImage[0].uri,
                }}
                className="h-[100px] w-[100px] object-cover"
              />
              {isImageSending ? (
                <View className="absolute w-full h-full inset-0 items-center justify-center bg-black/30">
                  <ActivityIndicator size={"small"} color={"#fff"} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleRemove}
                  className="bg-gray-200 rounded-full h-8 w-8 items-center justify-center absolute top-0 right-0"
                >
                  <Ionicons name="close" size={24} color={"black"} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </>
    </View>
  );
};

export default MessageSection;
