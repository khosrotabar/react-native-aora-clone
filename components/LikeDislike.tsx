import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ActivityIndicator, Alert, Text, TouchableOpacity } from "react-native";
import { Models } from "react-native-appwrite";
import { updatePostLikes } from "@/lib/appwrite";

const LikeDislike = ({
  likes,
  videoData,
}: {
  likes: string[];
  videoData: Models.Document;
}) => {
  const context = useGlobalContext();
  const [submiting, setSubmitting] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(
    likes.includes(context?.user?.$id ?? "")
  );

  const handleLikeDislike = async () => {
    setSubmitting(true);

    try {
      await updatePostLikes(context?.user?.$id, videoData);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setIsLiked(!isLiked);
      setSubmitting(false);
    }
  };

  return (
    <TouchableOpacity activeOpacity={100} onPress={handleLikeDislike}>
      {!submiting ? (
        <Text>
          <Entypo name="heart" size={24} color={isLiked ? "red" : "white"} />;
        </Text>
      ) : (
        <ActivityIndicator size={25} color="#FFFFFF" className="mr-[2px]" />
      )}
    </TouchableOpacity>
  );
};

export default LikeDislike;
