import React, { FC, useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import Footer from './Footer';

/**
 * Button demo
 */
const ButtonSymbolDemo: FC = () => {
  const ref = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (elements.length === 0 && ref.current) {
      // @ts-ignore
      setElements([ref.current]);
    }
  });

  return (
    <div>
      <Button
        ref={ref}
        id={'button'}
        icon={<UpCircleOutlined />}
        symbol-name={'测试组件'}
        type={'primary'}
      >
        文本
      </Button>
      <Footer elements={elements} />
    </div>
  );
};

export default ButtonSymbolDemo;
