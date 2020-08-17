import React, { FC, useRef } from 'react';
import { Modal } from 'antd';
import styles from './test.less';

/**
 *
 */
const ModalPage: FC = () => {
  const ref = useRef();
  return (
    <div ref={ref} id={'x-modal'} style={{ width: '100%', height: '100%' }}>
      <Modal
        visible={true}
        title={'123123'}
        mask={false}
        maskClosable
        wrapClassName={styles.modal}
        getContainer={() => document.getElementById('x-modal')}
      >
        123
      </Modal>
    </div>
  );
};

export default ModalPage;
