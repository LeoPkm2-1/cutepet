import * as React from 'react';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';

export const StyledTypography = styled(Typography)({
  fontFamily: 'quicksand',
});
export const StyledButton = styled(Button)({
  fontFamily: 'quicksand',
  textTransform: 'none',
  height: '44px',
  backgroundColor: '#ff5b2e',
  padding: '5px 30px',
  '&:hover': {
    backgroundColor: ' #000958',
  },
});
