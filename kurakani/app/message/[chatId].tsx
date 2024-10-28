import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "@/components/message/TopBar";
import MessageSection from "@/components/message/MessageSection";
import BottomBar from "@/components/message/BottomBar";
import * as ImagePicker from "expo-image-picker";

const Chat = () => {
  const [imageSelected, setImageSelected] = useState<
    ImagePicker.ImagePickerAsset[] | []
  >([]);

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
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <TopBar />
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={scrollToBottom}
          className="pt-1 flex-1"
        >
          <MessageSection
            selectedImage={imageSelected}
            setSelectdImage={setImageSelected}
          />
        </ScrollView>
        <BottomBar pickImage={pickImage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;
