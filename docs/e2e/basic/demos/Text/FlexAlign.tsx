import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
import './Text.less';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref} style={{ display: 'flex' }}>
        <div style={{ marginRight: 24 }}>
          Row 模式
          <div style={{ display: 'flex' }}>
            <div
              id="row-left-top"
              className="row-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: 'cornsilk',
              }}
            >
              左上
            </div>
            <div
              id="row-center-top"
              className="row-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor: 'aliceblue',
              }}
            >
              中上
            </div>
            <div
              id="row-right-top"
              className="row-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                backgroundColor: 'cornsilk',
              }}
            >
              右上
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              id="row-left-middle"
              className="row-item"
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'aliceblue',
              }}
            >
              左中
            </div>
            <div
              id="row-center-middle"
              className="row-item"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'antiquewhite',
              }}
            >
              中中
            </div>
            <div
              id="row-right-middle"
              className="row-item"
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: 'azure',
              }}
            >
              右中
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              id="row-left-bottom"
              className="row-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                backgroundColor: 'beige',
              }}
            >
              左下
            </div>
            <div
              id="row-center-bottom"
              className="row-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                backgroundColor: 'aliceblue',
              }}
            >
              中下
            </div>
            <div
              id="row-right-bottom"
              className="row-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                backgroundColor: 'cornsilk',
              }}
            >
              右下
            </div>
          </div>
        </div>
        <div>
          Column 模式
          <div style={{ display: 'flex' }}>
            <div
              id="column-left-top"
              className="column-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: 'cornsilk',
              }}
            >
              左上
            </div>
            <div
              id="column-center-top"
              className="column-item"
              style={{
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'aliceblue',
              }}
            >
              中上
            </div>
            <div
              id="column-right-top"
              className="column-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                backgroundColor: 'cornsilk',
              }}
            >
              右上
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              id="column-left-middle"
              className="column-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                backgroundColor: 'aliceblue',
              }}
            >
              左中
            </div>
            <div
              id="column-center-middle"
              className="column-item"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'antiquewhite',
              }}
            >
              中中
            </div>
            <div
              id="column-right-middle"
              className="column-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
                backgroundColor: 'azure',
              }}
            >
              右中
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div
              id="column-left-bottom"
              className="column-item"
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                backgroundColor: 'beige',
              }}
            >
              左下
            </div>
            <div
              id="column-center-bottom"
              className="column-item"
              style={{
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundColor: 'aliceblue',
              }}
            >
              中下
            </div>
            <div
              id="column-right-bottom"
              className="column-item"
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                backgroundColor: 'cornsilk',
              }}
            >
              右下
            </div>
          </div>
        </div>
      </div>
    </TestLayout>
  );
};
