import React, { useEffect, useRef } from "react";
import { TouchableWithoutFeedback, View, TouchableOpacity, StyleSheet, Animated, Image } from "react-native";
import FastImage from "react-native-fast-image";
import colors from "../../constants/colors";
import icons from "../../constants/icons";
import sizes from "../../constants/sizes";
import { IImage } from "../../interfaces/Image";
import { IUser } from "../../interfaces/User";
import Gradient from "../Gradient";

interface ImageItemProps {
  item: IImage;
  onPressUser: () => void;
  onPressClose: () => void;
}


const ImageItem: React.FC<ImageItemProps> = ({ item, onPressUser, onPressClose }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.ValueXY({ x: 10, y: 0 })).current;
  const translateButton = useRef(new Animated.ValueXY({ x: 0, y: -30 })).current;

  useEffect(() => {
    onRelease();
  }, []);

  const onLongPress = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: { x: 10, y: 0 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateButton, {
        toValue: { x: 0, y: -30 },
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }

  const onRelease = () => {
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

  return (
    <TouchableWithoutFeedback
      onLongPress={onLongPress}
      onPressOut={onRelease}
      delayLongPress={300}
    >
      <View
        style={styles.imageContainer}
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
              width: 40,
              height: 40,
              transform: [{ translateY: translateButton.y }, { translateX: translateButton.x }],
              opacity
            }}
          >
            <Image
              source={icons.closeIcon}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
              }}
            />
          </Animated.View>
        </TouchableOpacity>
        <FastImage
          source={{
            uri: item?.images?.full ? item?.images?.full : item?.images?.small,
            cache: FastImage.cacheControl.immutable,
            priority: FastImage.priority.high
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Animated.View
          style={{ opacity, zIndex: 2 }}
        >
          <Gradient
            colors={[colors.transparentDark, colors.transparentDark70]}
          >
            <View
              style={styles.imageInfoContainer}
            >
              <View>
                <Animated.Text
                  style={[
                    styles.imageTitle,
                    {
                      transform: [
                        {
                          translateX: translate.x
                        },
                        {
                          translateY: translate.y
                        }
                      ]
                    }
                  ]}
                >
                  {item.votes} likes
                </Animated.Text>
              </View>
              <TouchableOpacity
                onPress={onPressUser}
              >
                <View
                  style={styles.imageAuthorContainer}
                >
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateX: translate.x
                        },
                        {
                          translateY: translate.y
                        }
                      ]
                    }}
                  >
                    <FastImage
                      source={{
                        uri: item?.user?.profile_image,
                        cache: FastImage.cacheControl.immutable,
                        priority: FastImage.priority.high
                      }}
                      style={styles.imageUserAvatar}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </Animated.View>
                  <View
                    style={styles.imageUserContainer}
                  >
                    <Animated.Text
                      style={[
                        styles.imageUsername,
                        {
                          transform: [
                            {
                              translateX: translate.x
                            },
                            {
                              translateY: translate.y
                            }
                          ]
                        }
                      ]}
                    >
                      {item.user.fullname}
                    </Animated.Text>
                    <Animated.Text
                      style={[
                        styles.text,
                        {
                          transform: [
                            {
                              translateX: translate.x
                            },
                            {
                              translateY: translate.y
                            }
                          ]
                        }
                      ]}
                    >
                      View profile
                    </Animated.Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </Gradient>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: sizes.width,
    height: sizes.height,
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  imageInfoContainer: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  imageTitle: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: "Poppins-Regular",
  },
  imageAuthorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  imageUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  imageUserContainer: {
    marginLeft: 10
  },
  imageUsername: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    fontSize: 11,
    color: colors.primary,
    fontFamily: "Poppins-Regular",
  }
})

export default ImageItem;