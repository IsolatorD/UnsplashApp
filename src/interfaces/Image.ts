import { IUser } from "./User";

export interface IImage {
  id: string;
  votes: number;
  title?: string;
  images: {
    small: string;
    full?: string;
  }
  user: IUser
}

export interface IImageContext {
  images: IImage[];
  loading: boolean;
  setImages: (images: IImage[]) => void;
  onLoadMore: () => void;
}

export interface IImagesState {
  images: IImage[];
}