import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import sizes from "../../constants/sizes";

interface ICardProps extends ViewProps {
  position: "top" | "bottom";
  isLast: boolean;
  onPress: () => void;
}

export default function Card({ position, isLast, style, children, onPress, ...props }: ICardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View
        style={[
          styles.cardContainer,
          isLast ? styles.lastCardContainer :
          position === "top" ? styles.topCardContainer : styles.bottomCardContainer,
          style
        ]}
        {...props}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: sizes.width / 2 - 45,
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
  },
  topCardContainer: {
    marginBottom: 25
  },
  bottomCardContainer: {
    marginTop: 25
  },
  lastCardContainer: {
    marginTop: 25,
    marginBottom: 50,
  },
})