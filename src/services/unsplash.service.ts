import axios from 'axios';

const UNSPLASH_API_URL = 'https://api.unsplash.com/'
const UNSPLASH_ACCESS_KEY = 'a2f508640cb62f314e0e0763594d40aab1c858a7ef796184067c537a88b276aa'

const unsplash = axios.create({
  baseURL: UNSPLASH_API_URL,
  headers: {
    Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    'Accept-Version': 'v1'
  }
});

export class UnsplashService {
  getPhotos (page: number = 1) {
    return unsplash.get('photos', {
      params: {
        page: page,
        per_page: 10
      }
    });
  }

  getPhoto (photoId: string) {
    return unsplash.get(`photos/${photoId}`);
  }

  getUserPhotos (username: string, page: number = 1) {
    return unsplash.get(`users/${username}/photos`, {
      params: {
        page: page,
        per_page: 10
      }
    });
  }
}