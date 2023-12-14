import { Text as DefaultText, StyleProp, TextStyle } from "react-native";
import React, { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";

const textStyles = cva("text-textLight dark:text-textDark", {
  variants: {
    header: {
      true: "text-headerTextLight dark:text-headerTextDark",
    },
  },
});

export interface IText
  extends VariantProps<typeof textStyles>,
    ComponentProps<typeof DefaultText> {}

const Text: React.FC<IText> = ({ header, ...props }) => {
  return <DefaultText {...props} className={textStyles({ header })} />;
};

export default Text;
