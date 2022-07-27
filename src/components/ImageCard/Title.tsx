import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

interface ITitleProps extends TextProps {
}

export default function Title({ children }: ITitleProps) {

  return (
    <Text
      style={styles.title}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: "#fff",
    fontFamily: 'Poppins-SemiBold'
  }
})