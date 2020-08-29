import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';

import { useElements, TestLayout } from '@test-utils';

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
      <div ref={ref} />
      <Modal
        visible
        title="Modal 测试"
        mask={false}
        centered
        maskClosable
        className="modal-body"
        wrapClassName="modal-wrapper"
      >
        这是里面的内容
      </Modal>
    </TestLayout>
  );
};

export default ModalPage;
