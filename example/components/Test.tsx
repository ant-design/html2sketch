import React, { FC } from 'react';
import styles from './test.less';

/**
 *
 */
export const Test: FC = () => {
  return (
    <div id={'x-tag'}>
      <div className={styles.ellipsis} style={{ width: 50 }}>
        926024273276
      </div>
    </div>
  );
};
