import styled from "@emotion/styled";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export const StyledTextField = styled(TextField)`
  font-family: quicksand;
  font-size: 13px;

  .MuiInputLabel-root,
  .MuiInputBase-root {
    font: inherit;
    font-weight: 500;
  }

  .MuiFormHelperText-root {
    font: inherit;
    font-weight: 500;
    font-size: 12px;
  }
`;

export const StyledInputLabel = styled(InputLabel)`
  font: inherit;
  font-weight: 500;
`;

export const StyledSelect = styled(Select)`
  font: inherit;
  font-weight: 500;
`;

export const StyledInput = styled(Input)`
  font: inherit;
  font-weight: 500;
`;

export const StyledFormControl = styled(FormControl)`
  font-family: quicksand;
  font-size: 13px;

  /* .MuiFormHelperText-root {
    font-family: inherit;
    font-weight: 500;
  } */
`;

export const StyledMenuItem = styled(MenuItem)`
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  white-space: normal;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #565656;
  display: block;
  margin-top: 16px;
  /* text-transform: uppercase; */
  font-weight: 600;
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
  font-family: quicksand;
  font-size: 13px;
  margin-left: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;

  .MuiFormControlLabel-label {
    font: inherit;
    font-weight: 500;
    flex: 1;
  }
`;

export const StyledFormHelperText = styled(FormHelperText)`
  font-family: "quicksand";
`;
