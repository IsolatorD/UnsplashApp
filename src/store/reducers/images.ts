import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IImage, IImagesState } from "../../interfaces/Image";

export const imageSlice = createSlice({
  name: 'auth',
  initialState: {
    images: [] as IImage[],
  } as IImagesState,
  reducers: {
    setImages: (state, action: PayloadAction<any>) => {
      state.images = [
        ...state.images.concat(action.payload.images)
      ];
    }
  }
});

export default imageSlice.reducer;