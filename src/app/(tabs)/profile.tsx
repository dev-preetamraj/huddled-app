import { Image, TouchableOpacity, View, useColorScheme } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Text from "@/components/ui/Text";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/ui/Button";

const ProfileScreen = () => {
  const { user, isLoaded } = useUser();
  const theme = useColorScheme() ?? 'dark';

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <View>
      <View className="relative">
        <View className="bg-gray-200 dark:bg-slate-900 w-full h-52" />
        <View className="absolute -bottom-8 left-4">
          <Image
            source={{ uri: user?.imageUrl }}
            className="h-40 w-40 rounded-full"
            style={{
              borderWidth: 4,
              borderColor: Colors[theme].background,
            }}
          />
          <TouchableOpacity
            className="absolute right-6 bottom-0 p-2 rounded-full"
            style={{ backgroundColor: Colors[theme].background }}
          >
            <Ionicons
              size={24}
              color={Colors[theme].headerText}
              name="camera-outline"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="absolute right-5 bottom-5 p-2 rounded-full"
          style={{ backgroundColor: Colors[theme].background }}
        >
          <Ionicons
            size={24}
            color={Colors[theme].headerText}
            name="camera-outline"
          />
        </TouchableOpacity>
      </View>

      <View className="mt-10 mx-4 flex space-y-2">
        <Text className="text-2xl font-bold">{user?.fullName}</Text>
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center space-x-2">
            <TouchableOpacity className="bg-primaryLight dark:bg-primaryDark flex flex-row items-center space-x-1 p-2 rounded-sm">
              <Ionicons
                name="add"
                size={24}
                color={Colors[theme].headerText}
              />
              <Text header className="font-semibold">
                Add to story
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-secondaryLight dark:bg-secondaryDark flex flex-row items-center space-x-1 p-2 rounded-sm">
              <Ionicons
                name="pencil-sharp"
                size={24}
                color={Colors[theme].headerText}
              />
              <Text header className="font-semibold">
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="bg-secondaryLight dark:bg-secondaryDark p-2 border-t-2 rounded-sm border-secondaryLight dark:border-secondaryDark">
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={Colors[theme].headerText}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
