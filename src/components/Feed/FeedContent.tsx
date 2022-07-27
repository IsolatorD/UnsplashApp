import React from "react";
import { StyleSheet, FlatList, View, ActivityIndicator, Text } from "react-native";
import colors from "../../constants/colors";
import { IImage } from "../../interfaces/Image";
import ImageCard from '../ImageCard'

interface IFeedContentProps {
  data: IImage[];
  loading: boolean;
  onPressImage: (image: IImage) => void;
  onLoadMore: (e: any) => void;
}

export default function FeedContent({ data, loading, onPressImage, onLoadMore }: IFeedContentProps) {

  const renderItem = ({ item, index }: { item: IImage, index: number }) => {
    return (
      <ImageCard
        position={(index + 1) % 2 ? 'top' : 'bottom'}
        images={item.images}
        title={item?.title}
        votes={item.votes}
        isLast={(index + 1) === data.length}
        onPress={() => onPressImage(item)}
      />
    );
  }

  const renderFooterLoading = () => {
    if (loading) {
      return (
        <View
          style={styles.loadingContainer}
        >
          <ActivityIndicator
            color={colors.secondary}
            size="large"
          />
        </View>
      ) 
    }
    return null;
  }

  const renderEmpty = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text
          style={styles.emptyText}
        >
          No images found
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      renderItem={renderItem}
      style={styles.container}
      onEndReached={onLoadMore}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any) => `feed-${item.id}`}
      columnWrapperStyle={styles.columnWrapperStyle}
      ListFooterComponent={renderFooterLoading}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingTop: 20
  },
  columnWrapperStyle: {
    justifyContent: 'space-between'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },
  emptyText: {
    color: colors.secondary,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular'
  }
});