import { View } from "react-native";
import ActivityIndicator from "./ActivityIndicator";

const LoadingScreen = () => {
  return (
    <View className="flex-1 flex items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
