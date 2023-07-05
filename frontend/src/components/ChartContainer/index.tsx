import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  minHeight?: number;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function ChartContainer(props: Props) {
  return (
    <Paper
      sx={{
        minHeight: props.minHeight,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        borderRadius: 2,
      }}
    >
      <ChartTitle>{props.header}</ChartTitle>
      <ContentContainer>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
          {props.children}
        </div>
      </ContentContainer>
      {props.footer}
    </Paper>
  );
}

const ChartTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  flex: 1;
  position: relative;
`;
