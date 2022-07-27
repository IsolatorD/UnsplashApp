import React, { useContext } from "react";
import { ImagesContext } from '../context/images'

export default function useImages () {
 const context = useContext(ImagesContext)
  return context 
}