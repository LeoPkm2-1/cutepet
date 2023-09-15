import styled from "@emotion/styled";
import { ExtendButtonBase, Tab, TabTypeMap, Tabs } from "@mui/material";
import Image from "../../../../components/Image";

export const Root = styled.div`
  height: 280px;
  position: relative;
  background-color: #fff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (max-width: 600px) {
    align-items: initial;
  }
`;

export const CoverContainer = styled.div`
  width: 100%;
  height: 232px;
  overflow: hidden;
`;
export const CoverImg = styled(Image)`
  width: 100%;
  height: 100%;
  filter: blur(100px);
  object-fit: cover;
`;

export const InfoContainer = styled.div`
  position: absolute;
  width: 50%;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: auto;
    top: 24px;
    right: 24px;
    flex-direction: column;
  }
`;

export const NameContainer = styled.div`
  flex: 1;
  margin-left: 12px;
  color: #fff;
  min-width: 0;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  .profile-name {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5em;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 600px) {
    margin: 0;
    text-align: center;
  }
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: #000;
  }
`;

export const StyledTab = styled(Tab)`
  text-transform: none;
  font-family: quicksand;
  min-height: 48px;
  &.Mui-selected {
    font-weight: 700;
    color: #000;
  }
  @media (max-width: 420px) {
    .MuiTab-iconWrapper {
      margin-right: 0;
    }
    .tab-label {
      display: none;
    }
  }
` as unknown as ExtendButtonBase<TabTypeMap>;
