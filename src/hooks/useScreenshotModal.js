import { useState } from "react";

export const useScreenshotModal = () => {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return { modalImage, openModal, closeModal };
};

