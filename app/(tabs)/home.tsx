import {
  View,
  Text,
  FlatList,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import { useState } from "react";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts, getLatestVideos } from "@/lib/appwrite";
import useAppWritter from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";

const Home = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const {
    data: posts,
    isLoading: loadingPosts,
    refetch,
  } = useAppWritter(getAllPosts);
  const { data: latestVideos, isLoading: loadingLatestVideos } =
    useAppWritter(getLatestVideos);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (loadingPosts || loadingLatestVideos) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size={40} color="#FFFFFF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard key={item.$id} videoItem={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput value={searchVal} handleChange={setSearchVal} />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text
                className="text-gray-100 text-lg font-pregular
              mb-3"
              >
                Latest Videos
              </Text>
              <Trending posts={latestVideos} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
