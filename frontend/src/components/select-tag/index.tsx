import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledFormControl, StyledTextField } from "../FormItem";
import { Box, Chip, SvgIcon } from "@mui/material";
import styled from "@emotion/styled";
import { mdiCheck } from "@mdi/js";
import articleApi from "../../api/article";


type Props = {
  label?: string;
  placeholder?: string;
  onChange?: (value: string[]) => void;
  value: string[];
  error?: boolean;
  helperText?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;

};

export default function TagNameSelect(props: Props) {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState<string[]>(null);
  const [options, setOptions] = React.useState<readonly string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    articleApi.getCategori().then((data) => {
      if( data?.status == 200){
        setOptions(data?.payload)
      }
    })
  }, [])
  // React.useEffect(() => {
  //   setValue(props.value ?? null);
  // }, [props.value, options]);

//   React.useEffect(() => {
//     setLoading(true);
//     tagApi
//       .getTags()
//       .then((res) => {
//         setOptions(res);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

  return (
    <StyledFormControl sx={{ width: "300px" }} margin="dense">
      {/* <Label>{props.label ?? "Select user"}</Label> */}
      <Autocomplete
        readOnly = {!!props?.readonly}
        disabled = {!!props?.disabled}
        multiple
        sx={{
          backgroundColor: props.disabled ? "#f9f9f9" : "transparent",
        }}
        fullWidth
        // freeSolo
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={(e:React.SyntheticEvent,s) => {
          if(s == "blur"){
            setOpen(false);
          }
        }}
        value={props.value}
        onChange={(ev, value) => {
          // setValue(value);

          props.onChange?.(value);
        }}
        renderOption={(props, option, state) => {
          // const config = collectionConfig[option.id];

          return (
            <Box>
         
            <OptionLi {...props}>
              <span style={{ flex: 1 }}>{option}</span>
              <span style={{ display: "block", minWidth: 20 }}>
                {state.selected && (
                  <SvgIcon fontSize="small" color="info">
                    <path d={mdiCheck} />
                  </SvgIcon>
                )}
              </span>
            </OptionLi>
            </Box>
          );
        }}
        // isOptionEqualToValue={(option, value) => option.id === value.id}
        // getOptionLabel={(option) => option.title}
        options={options}
        loadingText={<span className="text text-small">loading...</span>}
        noOptionsText={<span className="text text-small">No collection</span>}
        loading={loading}
        renderTags={(values, props) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                paddingTop: 1,
                paddingBottom: 1,
              }}
            >
              {values.map((value) => {
                // const config = collectionConfig[value.id];
                return (
                  <>
                  <StyledChip
                    key={value}
                    // color="info"
                    // config={config}
                    variant="filled"
                    size="small"
                    label={<ChipLabel>{value}</ChipLabel>}
                  />
                  </>
                );
              })}
            </Box>
          );
        }}
        renderInput={(params) => (
          <>
          <StyledTextField
            {...params}
            
            helperText={props.helperText}
            error={props.error}
            InputProps={{
              ...params.InputProps,
              readOnly: true,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
          </>
        )}
      />
    </StyledFormControl>
  );
}

const OptionLi = styled.li`
  font-family: quicksand;
  font-size: 14px;
  display: flex;
`;

const ChipLabel = styled.span`
  font-family: quicksand;
  font-size: 14px;
  font-weight: 600;
  ::before {
    content: "#";
  }
`;

const StyledChip = styled(Chip)`
  background-color: #0e647e;
  color: #fff;
`;
