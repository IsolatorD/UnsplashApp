import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Container from '../components/Container';
import FeedContent from '../components/Feed/FeedContent';
import FeedHeader from '../components/Feed/FeedHeader';
import colors from '../constants/colors';
import { IImage } from '../interfaces/Image';
import { FeedScreenNavigationProp } from '../interfaces/navigation';
import useImages from '../hooks/useImages';

const FeedScreen: React.FC<FeedScreenNavigationProp> = ({ navigation }) =>{
  const { images, loading, onLoadMore } = useImages()

  useEffect(() => {
    onLoadMore()
  }, [])

  const onPressImage = (image: IImage) => {
    navigation.navigate('ImageDetail', { photoId: image.id })
  }

  return (
    <Container
      style={styles.container}
    >
      <FeedHeader />
      <FeedContent
        loading={loading}
        onLoadMore={onLoadMore}
        data={images}
        onPressImage={onPressImage}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary
  }
});

export default FeedScreen;