import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';
import { Container } from './styled';

type Props = {
  data: {
    label: string;
    value: number;
    color?: string;
  }[];
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  innerRadius: number;
  midAngle: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.2;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.2;
  if (percent < 0.05) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill="white"
      // textAnchor={x > cx ? 'start' : 'end'}
      textAnchor="middle"
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function MPieChart(props: Props) {
  return (
    <Container width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={props.data}
          dataKey="value"
          startAngle={450}
          endAngle={90}
          label={renderCustomizedLabel}
          labelLine={false}
          animationDuration={1000}
        >
          {props.data.map((cell, idx) => {
            return <Cell key={`cell-${idx}`} fill={cell.color} />;
          })}
        </Pie>
        <Tooltip
          formatter={(value, idx) => {
            const name = props.data[+idx]?.label;
            return [value + '%', name];
          }}
          contentStyle={{
            borderWidth: 0,
            borderRadius: 4,
            boxShadow: '0 0 6px rgba(0,0,0,0.16)',
            outline: 'none',
          }}
        />
        <Legend
          orientation={'right'}
          iconType="circle"
          // content={(props: any) => {
          //   console.log(props);
          //   return <>pas</>;
          // }}
          wrapperStyle={{
            fontSize: 11,
          }}
          color="#000"
          formatter={(value: string, entry: any) => {
            const idx = +value;
            return props.data[idx]?.label;
          }}
        />
      </PieChart>
    </Container>
  );
}
