import styled from '@emotion/styled';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Container } from './styled';

interface BarOption {
  key: string;
  color?: string;
}
type Props<T = { [key: string]: any }> = {
  indexKey: string;
  data: T[];
  bars: BarOption[];
  xTickFormatter?: (value: any) => string;
  yTickFormatter?: (value: any) => string;
  tooltipValueFormatter?: (value: any) => string;
  tooltipLabelFormatter?: (value: any) => string;
};

export default function MBarChart<T>(props: Props<T>) {
  return (
    <Container width="100%" height="100%">
      <BarChart data={props.data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={props.indexKey}
          tickLine={false}
          tickFormatter={props.xTickFormatter}
          interval="preserveStart"
        />

        <YAxis
          orientation="right"
          tickLine={false}
          tickFormatter={props.yTickFormatter}
          width={40}
          // interval="preserveStart"
        />
        <Tooltip
          labelFormatter={props.tooltipLabelFormatter}
          formatter={props.tooltipValueFormatter}
          contentStyle={{
            borderWidth: 0,
            borderRadius: 4,
            boxShadow: '0 0 6px rgba(0,0,0,0.16)',
            outline: 'none',
          }}
          // formatter={(value, name, item) => {
          //   return '';
          // }}
        />
        <Legend />
        {props.bars.map((bar) => {
          return (
            <Bar
              key={'bar-' + bar.key}
              dataKey={bar.key}
              fill={bar.color}
              animationDuration={1000}
            />
          );
        })}
      </BarChart>
    </Container>
  );
}
