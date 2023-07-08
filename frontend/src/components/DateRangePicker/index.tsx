import styled from '@emotion/styled';
import { mdiMenuDown } from '@mdi/js';
import AdapterDateMoment from '@mui/lab/AdapterMoment';
import {
  StaticDateRangePicker,
  LocalizationProvider,
  DateRange,
} from '@mui/lab';
import { Box, Popover, SvgIcon, TextField, useMediaQuery } from '@mui/material';
import { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import Button from '../Button';

type Props = {
  sx?: any;
  value?: DateRange<Moment>;
  onChange?: (value: DateRange<Moment>) => void;
  renderValue?: (value?: DateRange<Moment>) => React.ReactNode;
};

const defaultDateRange: DateRange<Moment> = [null, null];

export default function (props: Props) {
  const [value, setValue] = useState<DateRange<Moment> | undefined>(
    props.value
  );
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const mobile = useMediaQuery('(max-width: 670px)');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function defaultRenderValue() {
    const [start, end] = value ?? [];
    if (!start && !end) {
      return (
        <span className="expanded">
          <ValueText>Select Date Range</ValueText>
        </span>
      );
    }

    let startStr =
      start?.year() === end?.year()
        ? start?.format('MMM DD')
        : start?.format('MMM DD, YYYY');
    const endStr = end?.format('MMM DD, YYYY');

    return (
      <span className="expanded">
        <ValueText>{startStr}</ValueText> - <ValueText>{endStr}</ValueText>
      </span>
    );
  }

  return (
    <>
      <StyledButton
        sx={props.sx}
        size="small"
        onClick={(e) => {
          setAnchor(e.currentTarget);
        }}
      >
        {props.renderValue ? props.renderValue?.(value) : defaultRenderValue()}
        <SvgIcon>
          <path d={mdiMenuDown} />
        </SvgIcon>
      </StyledButton>
      <Popover
        open={!!anchor}
        anchorEl={anchor}
        // onClose={() => setAnchor(null)}
      >
        <PickerContainer>
          <LocalizationProvider dateAdapter={AdapterDateMoment}>
            <StaticDateRangePicker
              label="Scheduled time"
              displayStaticWrapperAs="desktop"
              calendars={mobile ? 1 : 2}
              value={value ?? defaultDateRange}
              onChange={setValue}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
          <Footer>
            <Button
              onClick={() => {
                setValue(props.value);
                setAnchor(null);
              }}
              size="small"
            >
              Cancel
            </Button>
            <StyledButton
              onClick={() => {
                props.onChange?.(value ?? defaultDateRange);
                setAnchor(null);
              }}
              sx={{ ml: 1 }}
              size="small"
            >
              Apply
            </StyledButton>
          </Footer>
        </PickerContainer>
      </Popover>
    </>
  );
}

const StyledButton = styled(Button)`
  background-color: rgba(20, 173, 166, 0.1);
  color: rgba(20, 173, 166, 1);
`;

const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  .MuiTypography-root,
  .MuiPickersDay-root {
    font-family: inherit;
  }
  .MuiTypography-subtitle1 {
    font-size: 14px;
  }
  .MuiPickersDay-root {
    font-size: 11px;
  }

  .PrivatePickersSlideTransition-root {
    min-height: 220px;
  }
`;

const Footer = styled.div`
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
`;

const ValueText = styled.span`
  padding: 0 8px;
`;
