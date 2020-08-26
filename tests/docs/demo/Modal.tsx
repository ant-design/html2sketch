import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import TestLayout from './utils/TestLayout';
import useElements from './utils/useElements';
import './Modal.less';

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
      <Modal
        visible
        title="Modal 测试"
        mask={false}
        centered
        maskClosable
        className="modal-body"
        wrapClassName="modal-wrapper"
      >
        123
      </Modal>
    </TestLayout>
  );
};

export default ModalPage;
