import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import colors from '../../constants/colors';
import icons from "../../constants/icons";
import fonts from "../../constants/fonts";

interface IFeedHeaderProps {}

export default function FeedHeader(props: IFeedHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.menu}>
        <Image source={icons.menuIcon} style={styles.menuIcon} />
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Discover
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: 'center',
    height: 65,
    paddingHorizontal: 20
  },
  menu: {
    padding: 10,
  },
  menuIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain'
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    ...fonts.title,
    color: colors.secondary,
    fontWeight: 'bold',
    marginRight: 40
  },
});