import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";

const LogoutIconButton = () => {
  const theme = useColorScheme();
  const { signOut } = useAuth();
  return (
    <Ionicons
      name="log-out-outline"
      size={24}
      color={Colors[theme ?? "dark"].headerText}
      style={{ marginRight: 16 }}
      onPress={() => signOut()}
    />
  );
};

export default LogoutIconButton;
