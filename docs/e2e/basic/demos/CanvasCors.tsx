import React, { useEffect } from 'react';
import { useElements, TestLayout } from '@docs-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const image = document.getElementById('source');

    image!.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
  }, []);
  return (
    <TestLayout elements={elements}>
      <div>
        <canvas ref={ref} id="canvas" width="500" height="500" />
      </div>
      <div style={{ display: 'none' }}>
        <img
          id="source"
          src="https://wx2.sinaimg.cn/large/4176adebgy1ge52j9bku3j20dl7pse2q.jpg"
          alt={'image'}
        />
      </div>
    </TestLayout>
  );
};
