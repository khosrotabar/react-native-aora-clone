import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { useEffect, useState } from "react";
import EmptyState from "@/components/EmptyState";
import { searchLikesPosts } from "@/lib/appwrite";
import useAppWritter from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const Search = () => {
  const context = useGlobalContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppWritter(() => searchLikesPosts(query, context?.user?.$id));

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    refetch();
  }, [query]);

  if (isLoading) {
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
          <View className="my-6 px-4">
            <Text className="font-pmedium text-2xl text-gray-100">
              Saved Videos
            </Text>
            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            btnText="Back to Explore"
            title="No Videos Found"
            subtitle="No videos found for this search query"
            handlePress={() => {
              router.push("/home");
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Search;
