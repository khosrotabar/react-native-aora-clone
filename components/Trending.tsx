import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useRef, useState } from "react";
import { Models } from "react-native-appwrite";
import * as Aniatable from "react-native-animatable";
import { icons } from "@/constants";
import Video, { VideoRef } from "react-native-video";

const zoomIn = {
  0: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
  1: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
};

const zoomOut = {
  0: {
    scaleX: 1.1,
    scaleY: 1.1,
  },
  1: {
    scaleX: 0.9,
    scaleY: 0.9,
  },
};

const TrndingItem = ({
  activeItem,
  item,
}: {
  activeItem: Models.Document;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState<boolean>(false);
  const videoRef = useRef<VideoRef>(null);

  return (
    <Aniatable.View
      className="mr-5"
      animation={activeItem.$id === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{
            uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          }}
          ref={videoRef}
          className="w-52 h-72 roundde-[35px] mt-3 bg-white/10"
          resizeMode="contain"
          showNotificationControls={false}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px]
         my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" />
        </TouchableOpacity>
      )}
    </Aniatable.View>
  );
};

const Trending = ({ posts }: { posts: Models.Document[] }) => {
  const [activeItem, setActiveItem] = useState<Models.Document>(posts[0]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<Models.Document>[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrndingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
      className="pl-3"
    />
  );
};

export default Trending;
