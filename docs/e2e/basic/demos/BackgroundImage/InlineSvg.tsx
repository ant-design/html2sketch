import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
// @ts-ignore
import styles from './Inline.less';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span className={styles.checkSvg} />
      </div>
    </TestLayout>
  );
};
