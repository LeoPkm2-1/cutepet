import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';

export const Root = styled(Box)`
  background-color: #fef8f3;
  display: flex;
  flex-direction: column;
  padding: 60px 100px;
`;

export const StyledTypography = styled(Typography)`
  color: #000958;
  font-weight: 700;
  font-family:"quicksand";
`;

export const StyledButton = styled(Button)`
  color: #fff;
  background-color: #ff5b2e;
  font-weight: 700;
  font-family:"quicksand";
  text-transform: none;
  padding: 10px 30px;
  transition: .2s linear;
  &:hover {
  background-color: #000958;
  }
`;