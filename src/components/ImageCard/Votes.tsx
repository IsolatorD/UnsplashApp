import React from "react";
import { Text, StyleSheet, TextProps } from "react-native";
import colors from "../../constants/colors";

interface IVotesProps extends TextProps{
}

export default function Votes({ children }: IVotesProps) {
  return (
    <Text
      style={styles.votes}
    >
      {children || 0} votes 
    </Text>
  );
};

const styles = StyleSheet.create({
  votes: {
    fontSize: 12,
    color: colors.transparent75,
    fontFamily: 'Poppins-Regular'
  }
});