import {
  View,
  Text,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import { useState } from "react";
import { LoginFormProps } from "@/types/types";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
  const context = useGlobalContext();
  const [form, setForm] = useState<LoginFormProps>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setIsSubmitting(true);

    try {
      await signIn(form.email, form.password);

      const results = await getCurrentUser();

      context?.setUser(results);
      context?.setIsLoggedIn(true);

      router.push("/home");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex-1 items-center justify-center px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Log in to Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setForm({ ...form, email: e.nativeEvent.text })
            }
            otherStyles="mt-7"
            placeHolder="john@example.com"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
              setForm({ ...form, password: e.nativeEvent.text })
            }
            placeHolder="**********"
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={handleSubmit}
            containerStyle="w-full mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
