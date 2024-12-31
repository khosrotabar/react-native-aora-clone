import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "@/constants";
import { useState } from "react";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  initialQuery,
}: {
  initialQuery?: string | string[];
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState<string | string[]>(initialQuery || "");

  const handleSearch = () => {
    if (!query && !pathname.startsWith("/bookmark")) {
      return Alert.alert(
        "Missing query",
        "Please input something to search results across database"
      );
    }

    if (pathname.startsWith("/search") || pathname.startsWith("/bookmark")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View className="relative flex-row mt-1 w-full h-16 bg-black-100 rounded-2xl items-center">
      <TextInput
        className="w-full mt-0.5 border-2 h-full text-left px-4 flex rounded-2xl
        focus:border-secondary border-black-200 text-white
        font-psemibold text-base"
        value={query as string}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE7"
        onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
          setQuery(e.nativeEvent.text)
        }
        keyboardType="default"
        cursorColor="#7b7b8b"
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image
          source={icons.search}
          className="w-5 h-5 absolute -top-2 right-3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
