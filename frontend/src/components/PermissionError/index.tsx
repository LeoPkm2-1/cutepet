import styled from "@emotion/styled";
import Image from "../Image";

export default function () {
  return (
    <Root>
      <IconImage src={`${process.env.PUBLIC_URL}/assets/images/bleach.png`} />
      <Text>Stop! You do not have permission to access this site.</Text>
    </Root>
  );
}

const Root = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
`;

const IconImage = styled(Image)`
  width: 96px;
  height: 96px;
`;

const Text = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  padding: 10px 20px;
  color: #d30606;
`;
