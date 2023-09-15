import imageCompression from "browser-image-compression";
import _ from "lodash";

export function compressImage(image: File, size = 1600) {
  console.log("Image before =>", _.round(image.size / 1024, 1), "KB");

  const options = {
    // maxSizeMB: 0.5,
    maxWidthOrHeight: size,
    useWebWorker: true,
  };
  return imageCompression(image, options).then((compressed) => {
    console.log("Compress image =>", _.round(compressed.size / 1024, 1), "KB");
    // compressed.name = image.name;
    return compressed;
  });
}
