import styled from "@emotion/styled";
import Button from "../../components/Button";
import { StyledTextField } from "../../components/FormItem";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* justify-content: center; */
  /* align-items: center; */
  padding: 8px;
  box-sizing: border-box;
  background: linear-gradient(115.71deg, #00a5c2 0%, #14ada6 100%);
  color: #fff;
`;

export const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding: 16px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
`;

export const Title = styled.div`
  box-sizing: border-box;
  font-weight: 700;
  text-align: center;
  margin-top: 8%;
  font-size: 24px;
  padding: 16px 0;
`;

export const LoginTitle = styled.div`
  font-size: 16px;
  margin: 16px 0;
  font-weight: 600;
`;

export const Footer = styled.div`
  box-sizing: border-box;
  height: 20%;
  min-height: 64px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const TextField = styled(StyledTextField)`
  .MuiOutlinedInput-root {
    background-color: #fff;
  }

  .MuiFormHelperText-root.Mui-error {
    color: #ba2121;
  }
`;

export const LoginButton = styled(Button)`
  background-color: #000;
  :hover {
    background-color: #1c1c1c;
  }
  :disabled {
    background-color: #7b7b7b;
    color: #b0afaf;
  }
`;
