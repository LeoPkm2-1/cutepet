import styled from "@emotion/styled";
import moment from "moment";
import { useState } from "react";
import { StyledTextField } from "../FormItem";
import Select from "../Select";

const hourOptions = Array(24)
  .fill(0)
  .map((_, i) => ({
    label: `${i}`,
    value: i,
  }));

const options = Array(60)
  .fill(0)
  .map((_, i) => ({
    label: `${i}`,
    value: i,
  }));

type Props = {
  value?: moment.Duration;
  onChange?: (value: moment.Duration) => void;
};

export default function DurationInput(props: Props) {
  const hour = props.value?.hours() ?? 0;
  const min = props.value?.minutes() ?? 0;
  const sec = props.value?.seconds() ?? 0;
  return (
    <Row>
      <Select
        value={hour}
        options={hourOptions}
        onChange={(v) => {
          const value = moment.duration({
            hour: +(v?.value ?? 0),
            minute: min,
            second: sec,
          });
          props.onChange?.(value);
        }}
      />
      <Unit>h</Unit>
      <Select
        value={min}
        options={options}
        onChange={(v) => {
          const value = moment.duration({
            hour: hour,
            minute: +(v?.value ?? 0),
            second: sec,
          });
          props.onChange?.(value);
        }}
      />
      <Unit>m</Unit>
      <Select
        value={sec}
        options={options}
        onChange={(v) => {
          const value = moment.duration({
            hour: hour,
            minute: min,
            second: +(v?.value ?? 0),
          });
          props.onChange?.(value);
        }}
      />
      <Unit>s</Unit>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Unit = styled.span`
  margin: 0 8px;
`;
