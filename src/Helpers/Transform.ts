import { IImage } from "../interfaces/Image";

export const transformImagesData = (images: Array<any>): IImage[] => {
  return images.map((image: any) => {
    return {
      id: image?.id,
      votes: image?.likes,
      images: {
        small: image?.urls?.small,
        full: image?.urls?.full
      },
      user: {
        id: image?.user?.id,
        username: image?.user?.username,
        fullname: image?.user?.name,
        bio: image?.user?.bio,
        profile_image: image?.user?.profile_image?.small
      }
    }
  });
}