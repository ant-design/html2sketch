import React from 'react';
import { useElements, TestLayout } from '@docs-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div>
          规划应用<a>全局设置</a>创建应用<a>应用管理</a>配置资源<a>应用实例</a>
        </div>
      </div>
    </TestLayout>
  );
};
