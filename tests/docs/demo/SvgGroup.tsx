import React, { FC, useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import TestLayout from './utils/TestLayout';

/**
 * Button demo
 */
const SvgGroupCase: FC = () => {
  const ref = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (elements.length === 0 && ref.current) {
      // @ts-ignore
      setElements([ref.current]);
    }
  });

  return (
    <TestLayout elements={elements}>
      <Button ref={ref} id="button" icon={<UpCircleOutlined />} type="primary">
        文本
      </Button>
    </TestLayout>
  );
};

export default SvgGroupCase;
