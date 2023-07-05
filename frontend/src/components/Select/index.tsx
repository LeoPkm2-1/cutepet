import React from 'react';
import {
  StyledFormControl,
  StyledInputLabel,
  StyledSelect,
  StyledMenuItem,
} from '../FormItem';
import FormHelperText from '@mui/material/FormHelperText';
import { FormControlPropsType } from '../../utils/type';

interface Option {
  label?: string | number;
  value: number | string;
}

type P = FormControlPropsType & {
  helperText?: React.ReactNode;
  name?: string;
  label?: string;
  placeholder?: string;
  id?: string;
  margin?: 'dense' | 'normal' | 'none';
  options: Option[];
  readOnly?: boolean;
  defaultValue?: string | number | Option;
  value?: string | number | Option;
  onChange?: (option?: Option) => void;
  fullWidth?: boolean;
  className?: string;
};

export default function Select({
  defaultValue,
  value,
  readOnly,
  helperText,
  placeholder,
  onChange,
  fullWidth = true,
  ...props
}: P) {
  return (
    <StyledFormControl
      margin="normal"
      size="small"
      variant="outlined"
      color="info"
      fullWidth={fullWidth}
      {...props}
    >
      <StyledInputLabel>{props.label}</StyledInputLabel>

      <StyledSelect
        name={props.name}
        label={props.label}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(props.options.find((i) => i.value === e.target.value));
        }}
        defaultValue={
          typeof defaultValue === 'object' ? defaultValue.value : defaultValue
        }
        value={typeof value === 'object' ? value.value : value}
      >
        {props.options.map((option) => {
          return (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.label}
            </StyledMenuItem>
          );
        })}
      </StyledSelect>
      {!!helperText && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}
