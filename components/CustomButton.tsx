import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  containerStyle,
  isLoading,
  textStyle,
  handlePress,
}: {
  title: string;
  containerStyle: string;
  textStyle?: string;
  isLoading?: boolean;
  handlePress: () => void;
}) => {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px]
    justify-center items-center ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
