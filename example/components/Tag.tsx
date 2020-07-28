import React, { FC } from 'react';
import { Tag, Space } from 'antd';

/**
 *
 */
export const RadioSymbol: FC = () => {
  return (
    <>
      <div>
        <Space>
          <Tag className="radio" symbolName="1.Tag 标签/1.Default默认/1.Off关">
            内容
          </Tag>
        </Space>
      </div>
    </>
  );
};
