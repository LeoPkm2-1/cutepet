import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 12px;
  min-width: 0;
  align-items: center;
  /* flex-direction: column; */
`;

export const Filename = styled.a`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #2d78b5;
  :hover {
    text-decoration: underline;
  }
`;
