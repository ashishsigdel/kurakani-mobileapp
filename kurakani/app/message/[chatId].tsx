import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TopBar from "@/components/message/TopBar";
import MessageSection from "@/components/message/MessageSection";
import BottomBar from "@/components/message/BottomBar";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { myAxios } from "@/helper/apiServices";
import { User } from "@/types/User";

// Define types for the message structure
interface ChatMessage {
  conversationId: string;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isSendByme: boolean;
  mediaURL: string | null;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
}

const Chat = () => {
  const { chatId } = useLocalSearchParams();

  const [imageSelected, setImageSelected] = useState<
    ImagePicker.ImagePickerAsset[] | []
  >([]);
  const [chatUser, setChatUser] = useState<User | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [isImageSending, setIsImageSending] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted == false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access your photos."
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setImageSelected(result.assets);
    }
  };

  // top user
  const fetchUser = async () => {
    try {
      const response = await myAxios.get(`/message/get-friend/${chatId}`);
      setChatUser(response.data.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  // fetch messages
  const fetchAllMessages = async () => {
    try {
      const response = await myAxios.get(`message/get/${chatId}`);
      setChatMessages(response.data.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  //send message
  const sendMessage = async () => {
    try {
      if (!chatId || !chatUser) {
        return;
      }
      const formData = new FormData();
      formData.append("message", message);

      if (imageSelected.length > 0) {
        // Create a properly typed media object
        const mediaFile = {
          uri: imageSelected[0].uri,
          type: imageSelected[0].type || "image/jpeg",
          name: imageSelected[0].fileName || "image.jpg",
        } as unknown as Blob;

        formData.append("media", mediaFile);
        setIsImageSending(true);
      }

      const response = await myAxios.post(
        `/message/send/${chatId}/${chatUser.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const newMessage: ChatMessage = {
        conversationId: chatId as string,
        createdAt: response.data.data.createdAt,
        deletedAt: response.data.data.deletedAt,
        id: response.data.data.id,
        isSendByme: true,
        mediaURL: response.data.data.mediaURL,
        message: response.data.data.message,
        receiverId: response.data.data.receiverId,
        senderId: response.data.data.senderId,
        updatedAt: response.data.data.updatedAt,
      };
      setImageSelected([]);
      setChatMessages((prevMessage) => [...prevMessage, newMessage]);
      setMessage("");
    } catch (error: any) {
      console.log(error.response.data.message);
    } finally {
      setIsImageSending(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchAllMessages();
    }, [])
  );

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <TopBar chatUser={chatUser} />
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
          className="pt-1 flex-1"
        >
          <MessageSection
            selectedImage={imageSelected}
            isImageSending={isImageSending}
            setSelectdImage={setImageSelected}
            chatMessages={chatMessages}
          />
        </ScrollView>

        <BottomBar
          message={message}
          setMessage={setMessage}
          pickImage={pickImage}
          handleSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
