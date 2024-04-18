import styled from '@emotion/styled';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import React from 'react';

type Props = {
  icon?: React.ReactNode;
  text?: React.ReactNode;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

export default function CustomMenuItem(props: Props) {
  return (
    <Root color={props.color} disabled={props.disabled} onClick={props.onClick}>
      {!!props.icon && (
        <StyledItemIcon style={{ minWidth: 32 }}>{props.icon}</StyledItemIcon>
      )}
      <StyledListItemText>{props.text}</StyledListItemText>
    </Root>
  );
}

const Root = styled(MenuItem)`
  color: ${({ color, disabled }) => (!disabled ? color : undefined)};
`;

const StyledItemIcon = styled(ListItemIcon)`
  color: inherit;
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    font-family: quicksand;
    font-weight: 500;
    font-size: 13px;
    color: inherit;
  }
`;
