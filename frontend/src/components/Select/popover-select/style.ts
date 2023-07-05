import { TreeItem } from "@mui/lab";
import { Button, Popover, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
export const StyledButton = styled(Button)({
  padding: "5px 16px",
  textTransform: "none",
  fontFamily: "inherit",
  minWidth: "250px",
  color: "rgba(0, 0, 0, 0.8)",
  fontSize: "13px",
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.43)',
    boxShadow: 'none',
  },
});

export const StyledPopover = styled(Popover)({
    padding: "6px 0px 6px 10px",
    maxWidth: "none",
    top: "3px",
  });

export const StyledTypograph = styled(Typography)({
    fontFamily: "inherit",
    fontSize: "16px",
    width: "250px",
});
export const StyledTreeViewTypograph = styled(Box)({
    fontFamily: "inherit",
    fontSize: "13px",
    width: "100%",
    padding: "6px 8px ",
});

export const StyledArrowRightIcon = styled(ArrowRightIcon)({
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)"
});
export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)({
    fontSize: "16px",
    color: "rgba(0, 0, 0, 0.54)"
})
export const StyledButtonArrowDropDownIcon = styled(ArrowDropDownIcon)({
  color: "rgba(0, 0, 0, 0.54)"
})

export const StyledButtonArrowDropUpIcon = styled(ArrowDropUpIcon)({
  color: "rgba(0, 0, 0, 0.54)"
})
