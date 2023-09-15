import styled from '@emotion/styled';
import { Slider } from '@mui/material';

export const StyledSlider = styled(Slider)`
  color: #10aca7;
  height: 8px;
  & .MuiSlider-track {
    border: none;
  }
  & .MuiSlider-thumb {
    height: 24px;
    width: 24px;
    background-color: #fff;
    border: 2px solid currentColor;
    &:focus,
    &:hover,
    &.Mui-active,
    &.Mui-focusVisible {
      box-shadow: inherit;
    }
    &:before {
      display: none;
    }
  }
  & .MuiSlider-valueLabel {
    line-height: 1.2em;
    font-size: 12px;
    background: unset;
    padding: 8px;
    background-color: #10aca7;
    border-radius: 8px;
    font-family: quicksand;
  }
`;

export const MinuteLabel = styled.span`
  min-width: 75px;
  text-align: right;
  color: #696969;
  font-size: 13px;
  font-weight: 500;
`;
