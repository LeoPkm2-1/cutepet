import { TreeItem } from "@mui/lab";
import { Button, Popover, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export const StyledButton = styled(Button)({
  padding: "6px 16px",
  textTransform: "none",
  fontFamily: "inherit",
  minWidth: "250px",
  color: "rgba(0, 0, 0, 0.6)",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.43)',
    boxShadow: 'none',
  },
});

export const StyledPopover = styled(Popover)({
    padding: "6px 0px 6px 10px",
    // textTransform: "none",
    // fontFamily: "inherit",
    maxWidth: "none",
    // backgroundColor: "green",
    // color: "rgba(0, 0, 0, 0.6)",
    // border: "1px solid rgba(0, 0, 0, 0.23)",
    // '&:hover': {
    //   borderColor: 'rgba(0, 0, 0, 0.43)',
    //   boxShadow: 'none',
    // },
  });

export const StyledTypograph = styled(Typography)({
    fontFamily: "inherit",
    fontSize: "16px",
    width: "250px"
});
export const StyledTreeViewTypograph = styled(Typography)({
    fontFamily: "inherit",
    fontSize: "15px",
});

export const StyledArrowRightIcon = styled(ArrowRightIcon)({
    fontSize: "16px",
    color: "gray"
});
export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)({
    fontSize: "16px",
    color: "gray"
})
