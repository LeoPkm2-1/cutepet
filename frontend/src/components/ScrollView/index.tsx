import React from "react";
import styled from "@emotion/styled";

const Root = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  margin: "10px";
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0px;
  right: 0px;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 12px;
`;

const ContentContainerSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  right: 10px;
  bottom: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
`;
type DivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
type P = {
  isSideBar?: boolean;
  contentContainerProps?: DivProps;
  rootRef?: React.RefObject<HTMLDivElement>;
} & DivProps;

export const ScrollView: React.FC<P> = ({
  isSideBar,
  children,
  rootRef,
  contentContainerProps,
  ...rest
}) => {
  return (
    <Root {...rest}>
      {isSideBar ? (
      <ContentContainerSidebar {...contentContainerProps} ref={rootRef}>
        {children}
      </ContentContainerSidebar>
      ) : (
        <ContentContainer {...contentContainerProps} ref={rootRef}>
        {children}
      </ContentContainer>
      )}
    </Root>
  );
};
