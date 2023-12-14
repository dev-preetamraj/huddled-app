import {
  ActivityIndicator as DefaultActivityIndicator,
  useColorScheme,
} from "react-native";
import React, { ComponentProps, FC } from "react";
import Colors from "@/constants/Colors";

export interface IActivityIndicator
  extends ComponentProps<typeof DefaultActivityIndicator> {}

const ActivityIndicator: FC<IActivityIndicator> = ({ ...props }) => {
  const theme = useColorScheme();
  return (
    <DefaultActivityIndicator
      color={Colors[theme ?? "dark"].primary}
      {...props}
    />
  );
};

export default ActivityIndicator;
