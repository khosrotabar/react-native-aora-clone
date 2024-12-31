import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import LikeDislike from "./LikeDislike";

const styles = StyleSheet.create({
  video: {
    flex: 1,
    alignSelf: "stretch",
    height: 258,
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: "#FFFFFF1A",
  },
});

const VideoCard = ({ videoItem }: { videoItem: Models.Document }) => {
  const {
    likes,
    title,
    thumbnail,
    video,
    creators: { username, avatar },
  } = videoItem;
  const [play, setPlay] = useState<boolean>(false);

  // video player configs
  const videoSource = video;
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.showNowPlayingNotification = true;
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  useEffect(() => {
    if (status === "idle") {
      player.currentTime = 0;
      player.pause();
      setPlay(false);
    }
  }, [status]);

  useEffect(() => {
    if (play === true) {
      player.play();
    }
  }, [play]);

  return (
    <View className="items-center px-4 mb-14">
      <View className="flex-row items-center px-4 mb-4">
        <View className="justify-center items-center flex-row">
          <View
            className="w-[46px] h-[46px] rounded-lg border border-secondary
            justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <LikeDislike likes={likes} videoData={videoItem} />
        </View>
      </View>

      {play ? (
        <VideoView
          player={player}
          style={styles.video}
          allowsFullscreen
          allowsPictureInPicture
          nativeControls
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full
            rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
