import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface FormFieldProps {
  title: string;
  value: string;
  handleChange: (text: string) => void;
  otherStyles?: string;
  placeholder: string;
}

const FormField = ({
  title,
  value,
  handleChange,
  otherStyles,
  placeholder,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = title.toLocaleLowerCase().includes("password");

  return (
    <View className={`w-full ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-semibold">{title}</Text>
      <View className="w-full h-14 px-4 bg-black/50 border-2 border-black-30 rounded-2xl items-center justify-center flex-row mt-1">
        <TextInput
          className="text-white flex-1 font-semibold text-base "
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={isPasswordField && !showPassword}
        />
        {isPasswordField && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Ionicons name="eye-off" size={20} color={"gray"} />
            ) : (
              <Ionicons name="eye" size={20} color={"gray"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
