import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import { useElements, TestLayout } from '@docs-utils';
// @ts-ignore
import styles from './Modal.less';

/**
 *
 */
const ModalPage: FC = () => {
  const { elements, ref, setElements } = useElements();

  useEffect(() => {
    const modal = document.getElementsByClassName('ant-modal')?.item(0);
    if (modal) {
      setElements([modal]);
    }
  }, [ref.current]);
  return (
    <TestLayout elements={elements}>
      <div ref={ref} style={{ position: 'relative', minHeight: 400 }}>
        <Modal
          visible
          title="Modal 测试"
          mask={false}
          // centered
          maskClosable
          wrapClassName={styles.wrapper}
          getContainer={false}
        >
          这是里面的内容
        </Modal>
      </div>
    </TestLayout>
  );
};

export default ModalPage;
