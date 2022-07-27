import React, { useState } from "react";
import { UnsplashService } from "../services/unsplash.service";

const Unsplash = new UnsplashService();

export default function useUnsplash() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getImages = async (page?: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = (await Unsplash.getPhotos(page)).data;
      return response;
    } catch (error: any) {
      setError(error);
      return []
    } finally {
      setLoading(false);
    }
  }

  const getImage = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = (await Unsplash.getPhoto(id)).data;
      return response;
    } catch (error: any) {
      setError(error);
      return null
    } finally {
      setLoading(false);
    }
  }

  const getUserPhotos = async (username: string, page?: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = (await Unsplash.getUserPhotos(username, page)).data;
      return response;
    } catch (error: any) {
      setError(error);
      return []
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    getImage,
    getImages,
    getUserPhotos
  };
}