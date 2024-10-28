import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface SearchFieldProps {
  value: string;
  handleChange: any;
  placeholder: string;
  otherStyles: string;
}
const SearchField = ({
  value,
  handleChange,
  placeholder,
  otherStyles,
}: SearchFieldProps) => {
  return (
    <View className={`${otherStyles}`}>
      <View className="w-full h-12 px-4 bg-black/20 border border-white/5 focus:border-white/10 rounded-2xl items-center justify-center flex-row">
        <TextInput
          className="flex-1 text-white font-semibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={handleChange}
        />
        <TouchableOpacity>
          <Ionicons name="search" color={"gray"} size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchField;
