import React, { createContext, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { transformImagesData } from "../Helpers/Transform";
import useUnsplash from "../hooks/useUnsplash";
import { IImage, IImageContext } from "../interfaces/Image";
import { RootState } from "../store";
import { imageSlice } from "../store/reducers/images";

export const ImagesContext = createContext<IImageContext>({} as IImageContext);

export const ImagesProvider = ({ children }: any) => {
  const { getImages, loading } = useUnsplash()
  const { images } = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const setImages = (images: IImage[]) => {
    dispatch(imageSlice.actions.setImages({images}));
  }

  const onLoadMore = async () => {
    if (loading) return
    const response = await getImages(page);
    setImages(transformImagesData(response));
    setPage(prevPage => prevPage + 1);
  }

  return (
    <ImagesContext.Provider
      value={{
        images,
        loading,
        setImages,
        onLoadMore
      }}
    >
      {children}
    </ImagesContext.Provider>
  );
}