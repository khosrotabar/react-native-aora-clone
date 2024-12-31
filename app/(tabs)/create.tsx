import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { icons } from "@/constants";
import { CreateFormProps } from "@/types/types";
import { useVideoPlayer, VideoView } from "expo-video";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: "stretch",
    height: 256,
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: "#FFFFFF1A",
  },
});

const Create = () => {
  const context = useGlobalContext();
  const [uploading, setUploading] = useState<boolean>(false);
  const [form, setForm] = useState<CreateFormProps>({
    title: "",
    thumbnail: null,
    video: null,
    prompts: "",
  });

  // video player configs
  const videoSource = form.video?.uri ?? "";
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
  });

  const openPicker = async (seletType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: seletType === "image" ? ["images"] : ["videos"],
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (seletType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (seletType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.thumbnail || !form.prompts || !form.video) {
      return Alert.alert("Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: context?.user?.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setForm({
        title: "",
        thumbnail: null,
        video: null,
        prompts: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeHolder="Give your video a catch title..."
          handleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setForm({ ...form, title: e.nativeEvent.text })
          }
          otherStyles="mt-10"
        />

        <View className="mt-7 gap-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <VideoView
                player={player}
                style={styles.video}
                nativeControls={false}
              />
            ) : (
              <View
                className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center
              items-center"
              >
                <View
                  className="w-14 h-14 border border-dashed rounded-[10px] border-secondary-100
                justify-center items-center"
                >
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2
                  h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 gap-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center
              items-center border-2 border-black-200 flex-row gap-2"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5
                  h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompts}
          placeHolder="The prompt you used to create this video"
          handleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setForm({ ...form, prompts: e.nativeEvent.text })
          }
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit"
          handlePress={handleSubmit}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
