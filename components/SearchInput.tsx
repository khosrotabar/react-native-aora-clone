import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  Image,
} from "react-native";
import { icons } from "@/constants";

const SearchInput = ({
  value,
  keyboardType,
  handleChange,
}: {
  value: string;
  keyboardType?: KeyboardTypeOptions;
  handleChange: (value: string) => void;
}) => {
  return (
    <View className="relative flex-row mt-1 w-full h-16 bg-black-100 rounded-2xl items-center">
      <TextInput
        className="w-full mt-0.5 border-2 h-full text-left px-4 flex rounded-2xl
        focus:border-secondary border-black-200 text-white
        font-psemibold text-base"
        // value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        // onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
        //   handleChange(e.nativeEvent.text)
        // }
        keyboardType={keyboardType}
        cursorColor="#7b7b8b"
      />

      <TouchableOpacity>
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
