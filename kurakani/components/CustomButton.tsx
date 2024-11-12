import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps {
  title: string;
  handlePress?: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
  iconname?: any;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  iconname,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`rounded-xl justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
    >
      {iconname && <Ionicons name={iconname} size={18} color={"white"} />}

      <Text className={`${textStyles}`}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
