import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import Container from "../components/Container";
import { IImage } from "../interfaces/Image";
import { ImageDetailScreenNavigationProp } from "../interfaces/navigation";
import useImages from "../hooks/useImages";
import ImageItem from "../components/ImageDetail/ImageItem";
import { IUser } from "../interfaces/User";

const ImageDetailScreen: React.FC<ImageDetailScreenNavigationProp> = ({ route, navigation }) => {
  const { photoId } = route?.params ?? {};
  const { images, onLoadMore } = useImages();
  const [initialScrollIndex, setInitialScrollIndex] = useState<number | null>(null);

  useEffect(() => {
    if (photoId) {
      const index = images.findIndex(image => image.id === photoId);
      if (index !== -1) {
        setInitialScrollIndex(index);
      } else {
        setInitialScrollIndex(0);
      }
    }

  }, [photoId]);

  const onPressUser = (user: IUser) => {
    navigation.navigate("UserProfile", { user });
  }

  return (
    <Container>
      {
        initialScrollIndex !== null && (
          <FlatList
            onEndReached={onLoadMore}
            data={images}
            pagingEnabled={true}
            horizontal={true}
            initialScrollIndex={initialScrollIndex}
            renderItem={({ item }) => (
              <ImageItem
                item={item}
                onPressUser={() => onPressUser(item.user)}
                onPressClose={() => navigation.pop()}
              />
            )}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: IImage, index: number) => `detail-${item.id}-${index}`}
          />
        )
      }
    </Container>
  )
}

export default ImageDetailScreen;