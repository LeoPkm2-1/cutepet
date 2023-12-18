import imageCompression from "browser-image-compression";
import _ from "lodash";

export function compressImage(image: File, size = 1600) {

  const options = {
    // maxSizeMB: 0.5,
    maxWidthOrHeight: size,
    useWebWorker: true,
  };
  return imageCompression(image, options).then((compressed) => {
    // compressed.name = image.name;
    return compressed;
  });
}
