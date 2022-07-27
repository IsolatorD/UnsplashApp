import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IUser } from './User';

export interface IImageDetailParams {
  photoId: string;
}

export interface IUserProfileParams {
  user: IUser;
}

export type AppNavigationParamList = {
  Feed: undefined;
  ImageDetail: IImageDetailParams;
  UserProfile: IUserProfileParams;
}

export type FeedScreenNavigationProp = NativeStackScreenProps<AppNavigationParamList, 'Feed'>;
export type ImageDetailScreenNavigationProp = NativeStackScreenProps<AppNavigationParamList, 'ImageDetail'>;
export type UserProfileScreenNavigationProp = NativeStackScreenProps<AppNavigationParamList, 'UserProfile'>;