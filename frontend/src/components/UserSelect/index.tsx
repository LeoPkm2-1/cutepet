import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Label, StyledMenuItem, StyledTextField } from '../FormItem';
import { Avatar } from '@mui/material';
import userApis from '../../api/user';
import { AccountType, UserType } from '../../models/user';
import { getDisplayNameFromUser } from '../../utils/user';

type Props = {
  label?: string;
  placeholder?: string;
  onChange?: (user?: UserType) => void;
  value?: UserType;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  accountType?: AccountType;
};

export default function UserSelect(props: Props) {
  const timeout = React.useRef<number>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<UserType | null>(null);
  const [options, setOptions] = React.useState<readonly UserType[]>([]);
  const [loading, setLoading] = React.useState(false);
  // const [text, setText] = React.useState('');

  React.useEffect(() => {
    setValue(props.value ?? null);
  }, [props.value]);

  const searchUser = React.useCallback(
    (keyword: string = '') => {
      if (timeout.current) {
        window.clearTimeout(timeout.current);
      }

      timeout.current = window.setTimeout(() => {
        keyword = keyword.toLowerCase();
        setLoading(true);
        timeout.current = undefined;
        return userApis
          .getUsers(
            {
              accountType: props.accountType,
              search: keyword,
            },
            { cancelable: true }
          )
          .then((res) => {
            setOptions(res.items);
            setLoading(false);
          })
          .catch((err) => {
            if (err?.message === 'canceled') {
              return;
            }
            if (err?.error?.statusCode === 404) {
              setOptions([]);
            }
            setLoading(false);
          });
      }, 200);
    },
    [props.accountType]
  );

  React.useEffect(() => {
    if (open) {
      searchUser();
    }
  }, [open, searchUser]);

  return (
    <div>
      <Label>{props.label ?? 'Select user'}</Label>
      <Autocomplete
        id="asynchronous-demo"
        fullWidth
        // freeSolo
        size="small"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={value}
        onChange={(ev, value) => {
          setValue(value);
          props.onChange?.(value ?? undefined);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => getDisplayNameFromUser(option)}
        options={options}
        loadingText={<span className="text text-small">loading...</span>}
        noOptionsText={
          <span className="text text-small">No matching users</span>
        }
        loading={loading}
        renderOption={(props, option, state) => {
          return (
            <StyledMenuItem {...props}>
              <Avatar
                sx={{ width: 32, height: 32, marginRight: 1 }}
                src={option.photoURL!}
              />
              <div className="col">
                {getDisplayNameFromUser(option)}
                <span className="text-light" style={{ fontSize: '0.9em' }}>
                  {option.email}
                </span>
              </div>
            </StyledMenuItem>
          );
        }}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            margin="dense"
            // label={props.label ?? "Select user"}
            placeholder={props.placeholder}
            error={props.error}
            helperText={props.helperText}
            required={props.required}
            onChange={(e) => {
              const v = e.currentTarget.value;
              // setText(v);
              searchUser(v);
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: value ? (
                <>
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    src={value.photoURL!}
                  />
                </>
              ) : null,
              endAdornment: (
                <>
                  {loading && <CircularProgress color="inherit" size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </div>
  );
}
