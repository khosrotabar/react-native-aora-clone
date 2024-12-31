import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppWritter from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppWritter(() => searchPosts(query));

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
            <Text className="font-pmedium text-sm text-gray-100">
              Search Results
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
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
      />
    </SafeAreaView>
  );
};

export default Search;
