import React, { useEffect, useRef, useState } from "react";
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, Animated, Image, FlatList, Text } from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../constants/colors";
import icons from "../constants/icons";
import sizes from "../constants/sizes";
import { UserProfileScreenNavigationProp } from "../interfaces/navigation";
import ScrollContainer from "../components/ScrollContainer";
import useUnsplash from "../hooks/useUnsplash";
import { IImage } from "../interfaces/Image";
import { transformImagesData } from "../Helpers/Transform";
import ImageCard from "../components/ImageCard";
import FeedContent from "../components/Feed/FeedContent";
import Container from "../components/Container";


const UserProfileScreen: React.FC<UserProfileScreenNavigationProp> = ({ route, navigation }) => {
  const { user } = route?.params || {};
  const { getUserPhotos, loading } = useUnsplash()
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState<IImage[]>([])
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.ValueXY({ x: 10, y: 0 })).current;
  const translateButton = useRef(new Animated.ValueXY({ x: 0, y: -30 })).current;

  useEffect(() => {
    onLoad();
    onLoadUserPhotos()
  }, []);

  const onLoadUserPhotos = async () => {
    if (loading) return;
    const response = await getUserPhotos(user.username, page)
    setPhotos(prevPhotos => prevPhotos.concat(transformImagesData(response)))
    setPage(prevPage => prevPage + 1)
  }

  const onLoad = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateButton, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  }

  const onPressClose = () => {
    navigation.pop();
  }

  const onPressImage = (item: IImage) => {
    navigation.push("ImageDetail", { photoId: item.id })
  }

  return (
    <Container
      style={styles.userContainer}
    >
      <TouchableOpacity
        onPress={onPressClose}
        style={{ zIndex: 2 }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            width: 50,
            height: 50,
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            transform: [{ translateY: translateButton.y }, { translateX: translateButton.x }],
            opacity
          }}
        >
          <Image
            source={icons.closeIcon}
            style={{
              width: 40,
              height: 40,
              tintColor: colors.secondary,
              resizeMode: "contain",
            }}
          />
        </Animated.View>
      </TouchableOpacity>
      <ScrollContainer
      >
        <View
          style={styles.userInfoContainer}
        >
          <View>
            <FastImage
              source={{
                uri: user?.profile_image,
                cache: FastImage.cacheControl.immutable,
                priority: FastImage.priority.high,
              }}
              style={styles.userImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View
            style={styles.userInfo}
          >
            <Text
              style={styles.userName}
            >
              {user?.fullname}
            </Text>
            <Text
              style={styles.userBio}
              textBreakStrategy="balanced"
            >
              {user?.bio}
            </Text>
          </View>
        </View>
        <View
          style={styles.userPhotosContainer}
        >
          <Text
            style={styles.title}
          >
            My Photos
          </Text>
        </View>
        <FeedContent
          loading={loading}
          onLoadMore={onLoadUserPhotos}
          data={photos}
          onPressImage={onPressImage}
        />
      </ScrollContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: colors.primary,
    width: sizes.width,
    height: sizes.height,
  },
  userInfoContainer: {
    marginTop: 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    flexWrap: "nowrap",
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.secondary
  },
  userBio: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: 'Poppins-Regular',
  },
  userPhotosContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-Bold',
    color: colors.secondary,
  }
})

export default UserProfileScreen;