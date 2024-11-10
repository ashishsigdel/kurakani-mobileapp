import { View, Text, Image } from "react-native";
import React from "react";
import profile from "@/assets/profile.png";
import { format } from "date-fns";
import { useSocket } from "@/helper/SocketProvider";

interface ChatUserProps {
  connection: any;
}
const ChatUser: React.FC<ChatUserProps> = ({ connection }) => {
  const formattedTime = format(new Date(connection.lastMessageAt), "hh:mm a");

  const truncatedMessage = connection.lastMessage
    ? (connection.isSendByme ? "You: " : "") + connection.lastMessage
    : "Connection Established.";

  // socket for online status
  const { onlineUsers } = useSocket();

  const isOnline = onlineUsers.includes(connection.user.id.toString());

  return (
    <View className="py-4 px-2 flex-row items-center justify-between border-b border-white/10 w-full">
      <View className="flex-row items-center space-x-4 w-full">
        <View className="relative">
          <Image
            width={12}
            height={12}
            source={
              connection.user.profilePic
                ? { uri: connection.user.profilePic }
                : profile
            }
            className="w-[60px] h-[60px] rounded-full"
          />
          {isOnline && (
            <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></View>
          )}
        </View>
        <View className="flex-1">
          <Text className="text-[18px] text-white/90 font-semibold mb-1">
            {connection.user.fullName}
          </Text>
          <Text
            numberOfLines={1}
            className="text-[13px] text-gray-300 font-semibold mb-1"
          >
            {truncatedMessage}
          </Text>
        </View>
        <Text className="text-[12px] text-gray-400 font-semibold">
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

export default ChatUser;
