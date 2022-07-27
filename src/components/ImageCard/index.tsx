import React from "react";
import Card from "./Card"
import Background from "./Background"
import Title from "./Title"
import Votes from "./Votes"
import Gradient from "../Gradient";
import colors from "../../constants/colors";

interface IImageCardProps {
  position: "top" | "bottom";
  images: {
    small: string;
    full?: string;
  };
  title?: string;
  votes?: number;
  isLast: boolean;
  onPress: () => void;
}

export default function ImageCard({ position, isLast, images, title, votes, onPress }: IImageCardProps) {

  return (
    <Card
      onPress={onPress}
      position={position}
      isLast={isLast}
    >
      <Background sources={images} />
      <Gradient
        colors={[colors.transparentDark, colors.transparentDark70]}
      >
        <Title>{title}</Title>
        <Votes>{votes}</Votes>
      </Gradient>
    </Card>
  );
};