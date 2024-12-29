import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ViewToken,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Models } from "react-native-appwrite";
import { icons } from "@/constants";
import Video, { VideoRef } from "react-native-video";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const TrndingItem = ({
  activeItem,
  item,
}: {
  activeItem: Models.Document;
  item: Models.Document;
}) => {
  const [play, setPlay] = useState<boolean>(false);
  const videoRef = useRef<VideoRef>(null);

  // Shared value for scaling
  const scale = useSharedValue(activeItem.$id === item.$id ? 1.1 : 0.95);
  const marginHorizontal = useSharedValue(activeItem.$id === item.$id ? 18 : 4);

  // Update scale when `activeItem` changes
  useEffect(() => {
    scale.value = withTiming(activeItem.$id === item.$id ? 1.1 : 0.95, {
      duration: 400,
    });
    marginHorizontal.value = withTiming(activeItem.$id === item.$id ? 18 : 4, {
      duration: 400,
    });
  }, [activeItem.$id, item.$id]);

  // Animated style for scaling
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    marginHorizontal: marginHorizontal.value,
  }));

  return (
    <Animated.View style={[animatedStyle]}>
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
    </Animated.View>
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
    />
  );
};

export default Trending;
