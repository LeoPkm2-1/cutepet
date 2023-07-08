import React from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Formatter,
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { CurveType } from 'recharts/types/shape/Curve';
import { Container } from './styled';

interface LineOption {
  key: string;
  color?: string;
  type?: CurveType;
}

type Props<T = { [key: string]: any }> = {
  indexKey: string;
  data: T[];
  lines: LineOption[];
  references?: {
    key: string;
    color?: string;
    value: string | number;
    label?: string;
  }[];
  xTickFormatter?: (value: any) => string;
  yTickFormatter?: (value: any) => string;
  tooltipValueFormatter?: Formatter<ValueType, NameType>;
  tooltipLabelFormatter?: (value: any) => string;
};

export default function MLineChart<T>(props: Props<T>) {
  return (
    <Container width="100%" height="100%">
      <LineChart
        // width={500}
        // height={300}
        data={props.data}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={props.indexKey}
          tickLine={false}
          tick={false}
          tickFormatter={props.xTickFormatter}
        />

        <YAxis
          orientation="right"
          tickLine={false}
          tickFormatter={props.yTickFormatter}
          width={40}
        />
        {props.references?.map((line) => {
          return (
            <ReferenceLine
              key={'ref-' + line.key}
              stroke={line.color}
              strokeDasharray="4 4"
              y={line.value}
              label={
                <Label
                  fill={line.color}
                  fontSize={11}
                  fontFamily="quicksand"
                  transform="translate(0, 8)"
                >
                  {line.label}
                </Label>
              }
            />
          );
        })}
        <Tooltip
          labelFormatter={props.tooltipLabelFormatter}
          formatter={props.tooltipValueFormatter}
          contentStyle={{
            borderWidth: 0,
            borderRadius: 4,
            boxShadow: '0 0 6px rgba(0,0,0,0.16)',
            outline: 'none',
          }}
        />
        <Legend />
        {props.lines.map((line) => {
          return (
            <Line
              animationDuration={1000}
              key={'line-' + line.key}
              type={line.type}
              dataKey={line.key}
              stroke={line.color}
              activeDot={{ r: 4 }}
              dot={{ r: 0 }}
            />
          );
        })}
      </LineChart>
    </Container>
  );
}
