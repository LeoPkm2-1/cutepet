import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { SearchButton, StyledInputBase } from "./styled";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onClick?: () => void;
  small?: boolean;
};
function SearchArticle(props: Props) {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          height: "40px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "50px",
          padding: props.small ? "3px 0px" : "5px 0px",
        //   boxShadow: (props.value || props.small) ? 1 : 0,
          animationDuration:"5s",
          boxShadow: 1,
          
        }}
      >
        <Box
          sx={{
            flex: "1",
            alignItems: "center",
            display: "flex",
            marginLeft: "15px",
          }}
        >
          <SearchIcon
            sx={{
              color: "#0e647e",
              marginRight: "10px",
            }}
          />
          <StyledInputBase
            onKeyDown={(e: any) => {
              if (e?.keyCode == 13) {
                props?.onClick?.();
              }
            }}
            value={props.value}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => {
              props.onChange?.(e);
            }}
            fullWidth
            placeholder={props.placeholder}
          />
        </Box>
        <SearchButton
          onClick={() => {
            props?.onClick?.();
          }}
          color="inherit"
          variant="contained"
          sx={{
            padding: props?.small ? "3px 24px" : "6px 26px",
            color: "#fff",
            backgroundColor: "#14ada6",
          }}
        >
          Search
        </SearchButton>
      </Box>
    </>
  );
}
export default SearchArticle;
