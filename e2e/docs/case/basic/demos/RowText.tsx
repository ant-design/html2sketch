import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import { RightOutlined, LinkOutlined } from '@ant-design/icons';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.09)',
          }}
        >
          规划应用 <a>全局设置</a>{' '}
          <RightOutlined style={{ color: 'rgba(0,0,0,.25)' }} /> 创建应用{' '}
          <a>应用管理</a> <RightOutlined style={{ color: 'rgba(0,0,0,.25)' }} />{' '}
          配置资源 <a>应用实例</a>{' '}
          <RightOutlined style={{ color: 'rgba(0,0,0,.25)' }} /> 部署应用{' '}
          <a>发布部署</a> <RightOutlined style={{ color: 'rgba(0,0,0,.25)' }} />{' '}
          监控运维{' '}
          <a>
            监控分析平台 <LinkOutlined />
          </a>
        </div>
      </div>
    </TestLayout>
  );
};
