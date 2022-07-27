import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import FastImage from 'react-native-fast-image'

interface IBackgroundProps {
  sources: {
    small: string;
    full?: string;
  };
}

export default function Background({ sources }: IBackgroundProps) {

  useEffect(() => {
    FastImage.preload([
      { uri: sources?.small, cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high },
      { uri: sources?.full, cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high },
    ]);
  }, [sources])

  return (
    <FastImage
      source={{
        uri: sources?.small,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.immutable
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={styles.backgroundImage}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 10
  }
});