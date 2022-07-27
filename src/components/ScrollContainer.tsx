import React from "react";
import { ScrollView, ActivityIndicator, ScrollViewProps } from "react-native";
import colors from "../constants/colors";

interface IScrollContainerProps extends ScrollViewProps {
  loading?: boolean;
}

export default function ScrollContainer ({ children, loading, style, ...rest }: IScrollContainerProps) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={[
        { flex: 1 },
        style
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} />
      ) : (
        children
      )}
    </ScrollView>
  );
}