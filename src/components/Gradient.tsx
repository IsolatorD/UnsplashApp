import React from "react";
import { StyleSheet, ViewProps } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface IGradientProps extends ViewProps {
  colors: Array<string>;
}

export default function Gradient ({ colors, children }: IGradientProps) {
  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.7 }}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    zIndex: 2
  }
})