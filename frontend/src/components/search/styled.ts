import { Button } from "@mui/material";
import { styled } from "@mui/styles";
import { InputBase } from "@mui/material";

export const SearchButton = styled(Button)({
  textTransform: "none",
  fontFamily: "inherit",
  minWidth: "90px",
  backgroundColor: "#0e647e",
  marginRight: "7px",
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: "#14ada6",
  },
});

export const StyledInputBase = styled(InputBase)({
  fontSize: "13px",
  fontFamily: "quicksand",

  "&.MuiInputLabel-root, &.MuiInputBase-root": {
    font: "inherit",
    fontWeight: 500,
    fontSize: "13px",

  },
});
