import React from 'react';
import { Tag } from 'antd';
import ProTable from '@ant-design/pro-table';
import { useElements, TestLayout } from '@e2e-utils';

const dataSource = [
  {
    key: 'row 0',
    'MW-xtdg': '848959274335',
    'MW-fpex': '龙东何同三族府满于矿强更红表元组。',
    'MW-qswn': '默认',
    'MW-jpae': '1993-03-06 18:48:44',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 1',
    'MW-xtdg': '812180154376',
    'MW-fpex': '思书织很有定方求议点主图受革。',
    'MW-qswn': '失败',
    'MW-jpae': '1988-08-04 22:14:41',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 2',
    'MW-xtdg': '171835892442',
    'MW-fpex': '属知么育和革情运派红时线适认。',
    'MW-qswn': '成功',
    'MW-jpae': '2020-05-22 04:37:28',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 3',
    'MW-xtdg': '993027665130',
    'MW-fpex': '团单往且关单石府数省它万指办据构如。',
    'MW-qswn': '警告',
    'MW-jpae': '2012-03-14 21:18:05',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 4',
    'MW-xtdg': '529632867282',
    'MW-fpex': '过指立半儿花总资党年王值程。',
    'MW-qswn': '警告',
    'MW-jpae': '1997-12-20 15:04:32',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 5',
    'MW-xtdg': '875562168564',
    'MW-fpex': '五九选所满加己约际系层除写儿样的风半。',
    'MW-qswn': '失败',
    'MW-jpae': '2018-03-26 18:41:52',
    'MW-sekp': {
      text: '红色',
      color: 'red',
    },
  },
  {
    key: 'row 6',
    'MW-xtdg': '413031923621',
    'MW-fpex': '本所须青全指电使华结代单相。',
    'MW-qswn': '默认',
    'MW-jpae': '1987-01-05 11:43:29',
    'MW-sekp': {
      text: '红色',
      color: 'red',
    },
  },
  {
    key: 'row 7',
    'MW-xtdg': '769184244892',
    'MW-fpex': '公毛接你见使音己太研场派龙新八热规。',
    'MW-qswn': '默认',
    'MW-jpae': '2014-12-08 12:23:23',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
  {
    key: 'row 8',
    'MW-xtdg': '500572744557',
    'MW-fpex': '越直步年果美需命位养院度参四天得。',
    'MW-qswn': '警告',
    'MW-jpae': '2017-08-30 04:53:29',
    'MW-sekp': {
      text: '绿色',
      color: 'green',
    },
  },
  {
    key: 'row 9',
    'MW-xtdg': '662886070336',
    'MW-fpex': '历结这听况研今基定况想子议至理动报严。',
    'MW-qswn': '处理中',
    'MW-jpae': '1971-10-07 17:56:56',
    'MW-sekp': {
      text: '蓝色',
      color: 'blue',
    },
  },
];

export default () => {
  const { elements, ref } = useElements();

  const columns = [
    {
      title: '编号',
      dataIndex: 'MW-xtdg',
      align: 'left',
      valueType: 'text',
      width: 154,
    },
    {
      title: '标题',
      dataIndex: 'MW-fpex',
      align: 'left',
      ellipsis: true,
      copyable: true,
      valueType: 'text',
      width: 228,
    },
    {
      title: '状态',
      dataIndex: 'MW-qswn',
      align: 'left',
      ellipsis: true,
      valueEnum: {
        成功: {
          text: '成功',
          status: 'Success',
        },
        失败: {
          text: '失败',
          status: 'Error',
        },
        处理中: {
          text: '处理中',
          status: 'Processing',
        },
        默认: {
          text: '默认',
          status: 'Default',
        },
        警告: {
          text: '警告',
          status: 'Warning',
        },
      },
      width: 113,
    },
    {
      title: '标签',
      dataIndex: 'MW-sekp',
      align: 'left',
      render: (cell: {
        color: string | (string & {}) | undefined;
        text: React.ReactNode;
      }) => <Tag color={cell.color}>{cell.text}</Tag>,
    },
    {
      title: '时间',
      dataIndex: 'MW-jpae',
      align: 'left',
      valueType: 'dateTime',
      width: 217,
    },
    {
      title: '操作',
      dataIndex: 'MW-elze',
      align: 'left',
      valueType: 'option',
      render: () => [<a>确认</a>, <a>删除</a>],
    },
  ];

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <ProTable
          // @ts-ignore
          columns={columns}
          rowKey="key"
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    </TestLayout>
  );
};
