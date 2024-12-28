import {
  View,
  Text,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  otherStyles,
  keyboardType,
  placeHolder,
  handleChange,
}: {
  title: string;
  value: string;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  placeHolder: string;
  handleChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean | undefined>(false);

  return (
    <View className={`w-full space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="flex-row mt-1 w-full h-16 bg-black-100 rounded-2xl items-center">
        <TextInput
          className="w-full border-2 h-full text-left px-4 flex rounded-2xl focus:border-secondary border-black-200 text-white font-psemibold text-base"
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChange={handleChange}
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
          cursorColor="#7b7b8b"
        />

        {title === "Password" && (
          <TouchableOpacity
            className="absolute right-4"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
