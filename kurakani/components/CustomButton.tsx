import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`rounded-xl justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
    >
      <Text className={`${textStyles}`}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
