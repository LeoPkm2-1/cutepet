import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../redux';
import { ScrollActions } from '../../redux/scroll';

const Root = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  margin: '10px';
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
  min-height: '100%';
  padding: 30px;
  /* border-radius: 12px; */
`;

const ContentContainerSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 10px;
  right: 10px;
  bottom: 0px;
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
  const isScrollEndpage = useSelector(
    (state: RootState) => state.scroll.endPageHome
  );
  const dispatch = useDispatch();
  const location = useLocation();

  const handleScroll = (event: any) => {
    if (
      event.currentTarget.scrollHeight -
        Math.round(event.currentTarget.scrollTop) >
      event.currentTarget.clientHeight + 300
    ) {
      // if (location.pathname.includes('home/mang-xa-hoi')) {
        if (isScrollEndpage) {
          dispatch(ScrollActions.setEndPageHome(false));
        }
      // }
    } else {
      // if (location.pathname.includes('home/mang-xa-hoi')) {
        if (!isScrollEndpage) {
          dispatch(ScrollActions.setEndPageHome(true));
        }
      // }
    }
    // const lengthScroll = event.currentTarget.scrollTop;

    // if (lengthScroll > 120 && location.pathname.includes('search')) {
    //   if (!isScrollStore) {
    //     dispatch(scrollActions.setSrollSticky(true));
    //   }
    // } else if (lengthScroll < 120) {
    //   if (isScrollStore) {
    //     dispatch(scrollActions.setSrollSticky(false));
    //   }
    // }

    // if (lengthScroll > 200 && location.pathname.includes('my-library')) {
    //   if (!isScrollLibrary) {
    //     dispatch(scrollActions.setStickyLibrary(true));
    //   }
    // } else if (lengthScroll < 200) {
    //   if (isScrollLibrary) {
    //     dispatch(scrollActions.setStickyLibrary(false));
    //   }
    // }
  };

  return (
    <Root {...rest}>
      {isSideBar ? (
        <ContentContainerSidebar
          onScroll={handleScroll}
          {...contentContainerProps}
          ref={rootRef}
        >
          {children}
        </ContentContainerSidebar>
      ) : (
        <ContentContainer
          onScroll={handleScroll}
          {...contentContainerProps}
          ref={rootRef}
        >
          {children}
        </ContentContainer>
      )}
    </Root>
  );
};
