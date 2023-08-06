import styled from '@emotion/styled';
import { ListItemText, Slider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const PageTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 32px;
  background-color: #fff;
  align-items: center;
  @media (max-width: 576px) {
    align-items: initial;
    padding: 16px 8px;
    flex-direction: column;
  }
`;

export const PageHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  font-size: 2em;
  font-weight: 700;
  padding-bottom: 8px;
  text-transform: uppercase;
  min-height: 48px;
  .secondary-title {
    color: #787878;
    font-size: 0.65em;
    font-weight: 600;
  }
`;

export const PageContainer = styled.div<{
  maxWidth?: number;
  padding?: string;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

export const PageContentContainer = styled.div`
  padding: 16px 32px;
  @media (max-width: 576px) {
    padding: 16px 8px;
  }
`;

export const StyledLink = styled(Link)`
  font-size: 13px;
  color: #004a92;
  font-weight: 600;
  :hover {
    text-decoration: underline;
    color: #0356aa;
  }
`;

export const StyledHref = styled.a`
  font-size: 13px;
  color: #004a92;
  font-weight: 600;
  :hover {
    text-decoration: underline;
    color: #0356aa;
  }
`;

export const StyledTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  font-family:"quicksand";
  /* :hover {
    text-decoration: underline;
    color: #1a2f44;
  } */
`;

export const StyledSpanTypography = styled(Typography)`
  font-size: 14px;
  font-weight: 700;
  font-family:"quicksand";
  /* :hover {
    text-decoration: underline;
    color: #1a2f44;
  } */
`;