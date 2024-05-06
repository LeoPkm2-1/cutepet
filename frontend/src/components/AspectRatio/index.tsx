import styled from "@emotion/styled";
import React from "react";

export type AspectRatioProps = {
  aspectRatio?: number;
};

export const AspectRatioContainer = styled.div<AspectRatioProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  flex: 1;
  padding-top: ${({ aspectRatio }) => (1 / (aspectRatio ?? 1)) * 100}%;

  .aspect-ratio_content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    & img {
      object-fit: cover;
    }
  }
`;
