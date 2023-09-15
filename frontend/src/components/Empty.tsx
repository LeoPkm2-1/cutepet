import styled from '@emotion/styled';
import React from 'react';
import Image from './Image';

type Props = {
  text?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

export default function Empty(props: Props) {
  return (
    <Root style={props.style} className={props.className}>
      <Image src={`${process.env.PUBLIC_URL}/assets/images/empty.svg`} />
      <EmptyText className="text">{props.text ?? 'Empty'}</EmptyText>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  background-color: #ffffff;
`;

const EmptyText = styled.div`
  color: #696969;
  margin-top: 8px;
  font-size: 13px;
  text-align: center;
`;
