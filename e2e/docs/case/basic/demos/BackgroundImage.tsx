import React, { useRef } from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import copy from 'copy-to-clipboard';
import { message } from 'antd';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <TestLayout
      elements={elements}
      buttons={[
        {
          name: '复制为 Base64',
          onClick: () => {
            const img = imageRef.current;
            if (!img) {
              return;
            }
            // 1. 创建canvas DOM元素，并设置其宽高和图片一样
            let canvas: HTMLCanvasElement | null = document.createElement(
              'canvas',
            );
            canvas.width = img.width;
            canvas.height = img.height;

            // 2. 使用画布画图
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, img.width, img.height);

            // 3. 返回的是一串Base64编码的URL并指定格式
            const dataURL = canvas.toDataURL(`image/png`);
            canvas = null; // 释放

            copy(dataURL);
            message.success('已复制到剪切板');
          },
        },
      ]}
    >
      <div ref={ref}>
        <div
          style={{
            width: 150,
            height: 200,
            backgroundImage:
              'url("https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png")',
          }}
        />
      </div>
    </TestLayout>
  );
};
