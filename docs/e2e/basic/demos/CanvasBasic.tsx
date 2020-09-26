import React from 'react';
import { Line } from '@ant-design/charts';
import { useElements, TestLayout } from '@docs-utils';

const data = [
  {
    date: '2018/8/1',
    type: 'download',
    value: 4623,
  },
  {
    date: '2018/8/1',
    type: 'register',
    value: 2208,
  },
  {
    date: '2018/8/1',
    type: 'bill',
    value: 182,
  },
  {
    date: '2018/8/2',
    type: 'download',
    value: 6145,
  },
  {
    date: '2018/8/2',
    type: 'register',
    value: 2016,
  },
  {
    date: '2018/8/2',
    type: 'bill',
    value: 257,
  },
  {
    date: '2018/8/3',
    type: 'download',
    value: 508,
  },
  {
    date: '2018/8/3',
    type: 'register',
    value: 2916,
  },
  {
    date: '2018/8/3',
    type: 'bill',
    value: 289,
  },
  {
    date: '2018/8/4',
    type: 'download',
    value: 6268,
  },
  {
    date: '2018/8/4',
    type: 'register',
    value: 4512,
  },
  {
    date: '2018/8/4',
    type: 'bill',
    value: 428,
  },
  {
    date: '2018/8/5',
    type: 'download',
    value: 6411,
  },
  {
    date: '2018/8/5',
    type: 'register',
    value: 8281,
  },
  {
    date: '2018/8/5',
    type: 'bill',
    value: 619,
  },
  {
    date: '2018/8/6',
    type: 'download',
    value: 1890,
  },
  {
    date: '2018/8/6',
    type: 'register',
    value: 2008,
  },
  {
    date: '2018/8/6',
    type: 'bill',
    value: 87,
  },
  {
    date: '2018/8/7',
    type: 'download',
    value: 4251,
  },
  {
    date: '2018/8/7',
    type: 'register',
    value: 1963,
  },
  {
    date: '2018/8/7',
    type: 'bill',
    value: 706,
  },
  {
    date: '2018/8/8',
    type: 'download',
    value: 2978,
  },
  {
    date: '2018/8/8',
    type: 'register',
    value: 2367,
  },
  {
    date: '2018/8/8',
    type: 'bill',
    value: 387,
  },
  {
    date: '2018/8/9',
    type: 'download',
    value: 3880,
  },
  {
    date: '2018/8/9',
    type: 'register',
    value: 2956,
  },
  {
    date: '2018/8/9',
    type: 'bill',
    value: 488,
  },
  {
    date: '2018/8/10',
    type: 'download',
    value: 3606,
  },
  {
    date: '2018/8/10',
    type: 'register',
    value: 678,
  },
  {
    date: '2018/8/10',
    type: 'bill',
    value: 507,
  },
  {
    date: '2018/8/11',
    type: 'download',
    value: 4311,
  },
  {
    date: '2018/8/11',
    type: 'register',
    value: 3188,
  },
  {
    date: '2018/8/11',
    type: 'bill',
    value: 548,
  },
  {
    date: '2018/8/12',
    type: 'download',
    value: 4116,
  },
  {
    date: '2018/8/12',
    type: 'register',
    value: 3491,
  },
  {
    date: '2018/8/12',
    type: 'bill',
    value: 456,
  },
  {
    date: '2018/8/13',
    type: 'download',
    value: 6419,
  },
  {
    date: '2018/8/13',
    type: 'register',
    value: 2852,
  },
  {
    date: '2018/8/13',
    type: 'bill',
    value: 689,
  },
  {
    date: '2018/8/14',
    type: 'download',
    value: 1643,
  },
  {
    date: '2018/8/14',
    type: 'register',
    value: 4788,
  },
  {
    date: '2018/8/14',
    type: 'bill',
    value: 280,
  },
  {
    date: '2018/8/15',
    type: 'download',
    value: 445,
  },
  {
    date: '2018/8/15',
    type: 'register',
    value: 4319,
  },
  {
    date: '2018/8/15',
    type: 'bill',
    value: 176,
  },
];
const config = {
  title: {
    visible: true,
    text: '多折线图',
  },
  description: {
    visible: true,
    text: '通过回调函数指定折线颜色',
  },
  padding: 'auto',
  forceFit: true,
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    label: {
      formatter: (v: string) =>
        `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  legend: { position: 'right-top' },
  seriesField: 'type',
  color: (d: string) => {
    return d === 'register' ? '#93D072' : '#2D71E7';
  },
  responsive: true,
};

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        {/* @ts-ignore */}
        <Line {...config} />
      </div>
    </TestLayout>
  );
};
