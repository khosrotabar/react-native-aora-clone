import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  subtitle,
  btnText,
  handlePress,
}: {
  title: string;
  subtitle: string;
  btnText: string;
  handlePress: () => void;
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-pmedium text-sm text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title={btnText}
        containerStyle="w-full my-5"
        handlePress={handlePress}
      />
    </View>
  );
};

export default EmptyState;
