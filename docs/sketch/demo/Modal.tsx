import React, { FC, useRef } from 'react';
import { Modal } from 'antd';

/**
 *
 */
const ModalPage: FC = () => {
  const ref = useRef(null);
  return (
    <div ref={ref} id="x-modal" style={{ width: '100%', height: '100%' }}>
      <Modal
        visible
        title="123123"
        mask={false}
        maskClosable
        getContainer={() => document.getElementById('x-modal')!}
      >
        123
      </Modal>
    </div>
  );
};

export default ModalPage;
