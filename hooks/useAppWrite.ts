import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Models } from "react-native-appwrite";

const useAppWritter = (fn: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Models.Document[]>([]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, refetch };
};

export default useAppWritter;
