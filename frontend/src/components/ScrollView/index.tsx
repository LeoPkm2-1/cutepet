import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type P = {
  contentContainerProps?: DivProps;
  rootRef?: React.RefObject<HTMLDivElement>;
} & DivProps;

export const ScrollView: React.FC<P> = ({
  children,
  rootRef,
  contentContainerProps,
  ...rest
}) => {
  return (
    <Root {...rest}>
      <ContentContainer {...contentContainerProps} ref={rootRef}>
        {children}
      </ContentContainer>
    </Root>
  );
};
