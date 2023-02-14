import { useState } from "react";

export const useDefaultImageOnError = (
  initialImageSrc: string
): [image: string, handler: () => void] => {
  const [ownerImage, setOwnerImage] = useState<string>(initialImageSrc);
  const onImageError = () => {
    setOwnerImage("/images/default-avatar.jpeg");
  };

  return [ownerImage, onImageError];
};
