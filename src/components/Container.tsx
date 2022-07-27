import React from "react";
import { View, ViewProps } from "react-native";

interface IContainerProps extends ViewProps {}

export default function Container ({ children, style, ...rest }: IContainerProps) {
  return (
    <View
      style={[
        { flex: 1 },
        style
      ]}
      {...rest}
    >
      {children} 
    </View>
  );
}