import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppWritter from "@/hooks/useAppWrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalProvider";
import { icons } from "@/constants";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const context = useGlobalContext();
  const { data: posts, isLoading } = useAppWritter(() =>
    getUserPosts(context?.user?.$id)
  );

  const handleLogOut = async () => {
    await signOut();
    context?.setUser(null);
    context?.setIsLoggedIn(false);

    router.replace("/sign-in");
  };

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
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={handleLogOut}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View
              className="w-16 h-16 border border-secondary rounded-lg justify-center
              items-center"
            >
              <Image
                source={{ uri: context?.user?.avatar || "" }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="contain"
              />
            </View>

            <InfoBox
              title={context?.user?.username || ""}
              containerStyles="mt-5"
              titleStyles="text-lg text-white"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={`${posts.length}`}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                containerStyles="ml-10"
                titleStyles="text-xl"
              />
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

export default Profile;
