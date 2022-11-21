/**
 * hideSketchLayout: true
 */
import { TestLayout, useElements } from '@docs-utils';
import React, { useEffect } from 'react';

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
          src="https://pic2.zhimg.com/80/v2-71bd309a73f00a84cde15cdd1f9a9fda_r.jpg"
          alt={'image'}
        />
      </div>
    </TestLayout>
  );
};
