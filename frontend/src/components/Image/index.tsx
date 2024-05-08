import React, { useCallback, useEffect, useState } from "react";
import { AspectRatioContainer, AspectRatioProps } from "../AspectRatio";

type ImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const fallbackImg = `${process.env.PUBLIC_URL}/assets/images/no_data.png`;

export default function Image({ src, ...rest }: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const handleError = useCallback(() => {
    setImgSrc(fallbackImg);
  }, []);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return <img {...rest} src={imgSrc ?? fallbackImg} onError={handleError} />;
}

type AspectRatioImgProps = ImageProps &
  AspectRatioProps & {
    imgStyle?: React.CSSProperties;
  };
export const AspectRatioImg = ({
  aspectRatio,
  style,
  className,
  imgStyle,
  ...rest
}: AspectRatioImgProps) => {
  return (
    <AspectRatioContainer
      aspectRatio={aspectRatio}
      style={style}
      className={className}
    >
      <Image className="aspect-ratio_content" {...rest} style={imgStyle} />
    </AspectRatioContainer>
  );
};
