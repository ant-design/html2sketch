import React, { FC, useRef, useState } from 'react';
import { Stage, Layer, Rect, Circle, Group, Text } from 'react-konva';
import { Button, Space, Divider, Card } from 'antd';
import {
  AnyLayer,
  nodeToGroup,
  Rectangle,
  Text as TextModel,
} from 'html2sketch';
import Konva from 'konva';

const ButtonCanvas: FC = () => {
  const ref = useRef(null);
  const [model, setModel] = useState(undefined);

  const renderModelToCanvas = (layer: AnyLayer, index: number) => {
    const defaultProps: Konva.NodeConfig = {
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      key: index,
    };
    switch (layer.class) {
      case 'group':
        return (
          <Group {...defaultProps} draggable>
            {layer.layers.map(renderModelToCanvas)}
          </Group>
        );
      case 'rectangle':
        const { style } = layer as Rectangle;
        const shadow = style.shadows?.[0];
        const fill = style.fills?.[0];
        const border = style.borders?.[0];

        return (
          <Rect
            {...defaultProps}
            cornerRadius={(layer as Rectangle).toKonvaRadius()}
            fill={fill.color.hex}
            strokeEnabled={style.borders.length > 0}
            strokeWidth={border.thickness}
            stroke={border.color.rbga}
            shadowBlur={shadow.blurRadius}
            shadowColor={shadow.color.rbga}
            shadowOffsetX={shadow.offsetX}
            shadowOffsetY={shadow.offsetY}
            shadowEnabled={style.shadows.length > 0}
          />
        );

      case 'text':
        const { textStyle } = layer as TextModel;

        return (
          <Text
            {...defaultProps}
            onDragMove={(e) => {
              console.log(e);
            }}
            fill={textStyle.color.rbga}
            lineHeight={textStyle.lineHeight! / textStyle.fontSize || undefined}
            fontSize={textStyle.fontSize}
            fontFamily={textStyle.fontFamily}
            verticalAlign={'middle'}
            text={(layer as TextModel).text}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div ref={ref}>
        <Button type={'primary'}>按钮1</Button>
        <Button danger>按钮2</Button>
      </div>
      <Divider />
      <Button
        type={'primary'}
        onClick={(e) => {
          const group = nodeToGroup(ref.current!);
          group.x = 4;
          group.y = 4;
          setModel(group);
        }}
      >
        渲染
      </Button>
      <Divider />
      <Card title={'渲染画布'}>
        <Stage width={300} height={300}>
          <Layer x={0} y={0}>
            <Group>{model ? renderModelToCanvas(model) : null}</Group>
          </Layer>
        </Stage>
      </Card>
    </div>
  );
};

export default ButtonCanvas;
