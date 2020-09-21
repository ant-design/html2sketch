import Color from 'color';
import { Style, Bitmap, Group, Rectangle, Shadow, Svg } from '../model';
import { defaultNodeStyle } from '../model/utils';
import { ColorParam } from '../model/Style/Color';
import { getActualImageSize, parseBackgroundImage } from '../utils/background';
import { base64ToSvgString, waitForImageLoaded } from '../utils/image';
import { optimizeSvgString } from '../utils/svg';
import { parseToSvg } from './svg';

/**
 * 将节点转换为 Shape 对象
 * @param node HTML Node
 * @param styles
 */
export const parseToShape = async (
  node: Element,
  styles?: CSSStyleDeclaration,
): Promise<Group | Rectangle> => {
  const bcr = node.getBoundingClientRect();

  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  const rect: Rectangle | null = new Rectangle({
    width,
    height,
    x: left,
    y: top,
  });

  // 解析基础信息

  rect.name = node.className || 'rect';
  rect.mapBasicInfo(node);

  // 解析样式

  const style = new Style();
  if (!styles) {
    styles = getComputedStyle(node);
  }

  const {
    // 背景颜色
    backgroundColor,
    // 边框
    borderWidth,
  } = styles;

  // 解析背景颜色
  const background = new Color(backgroundColor);
  if (background.alpha() !== 0) {
    style.addColorFill(backgroundColor);
  }

  // 解析阴影
  const { boxShadow } = styles;
  if (boxShadow !== defaultNodeStyle.boxShadow) {
    // 拿到阴影样式
    const shadowStrings = Shadow.splitShadowString(boxShadow);

    shadowStrings.forEach((shadowString: string) => {
      const shadowObject = Shadow.shadowStringToObject(shadowString);

      // 判断是内阴影还是外阴影
      if (shadowObject!.inset) {
        // 针对内阴影 如果存在 border 的话
        if (borderWidth.indexOf(' ') === -1) {
          // 需要给 spread + 1 才能还原相应效果
          shadowObject!.spread += parseFloat(borderWidth);
        }
        style.addInnerShadow(shadowObject);
      } else {
        style.addShadow(shadowObject);
      }
    });
  }

  // 处理描边
  if (borderWidth.indexOf(' ') === -1) {
    const {
      borderColor,
      borderBottomStyle,
      borderLeftStyle,
      borderTopStyle,
      borderRightStyle,
    } = styles;

    style.addBorder({
      color: borderColor,
      thickness: parseFloat(borderWidth),
    });

    // 如果是虚线
    const isDashed =
      borderBottomStyle === 'dashed' &&
      borderLeftStyle === 'dashed' &&
      borderTopStyle === 'dashed' &&
      borderRightStyle === 'dashed';
    if (isDashed) {
      style.setBorderDashed({
        dash: 3 * parseFloat(borderWidth),
        spacing: 3 * parseFloat(borderWidth),
      });
    }
    // 如果是点
    const isDotted =
      borderBottomStyle === 'dotted' &&
      borderLeftStyle === 'dotted' &&
      borderTopStyle === 'dotted' &&
      borderRightStyle === 'dotted';

    if (isDotted) {
      style.setBorderDashed({
        dash: parseFloat(borderWidth),
        spacing: parseFloat(borderWidth),
      });
    }
  } else {
    // 使用内阴影来模拟单边描边
    const {
      borderTopWidth,
      borderRightWidth,
      borderBottomWidth,
      borderLeftWidth,
    } = styles;
    // 顶部描边
    const borderTopWidthFloat = parseFloat(borderTopWidth);
    if (borderTopWidthFloat !== 0) {
      style.addInnerShadow({
        color: styles.borderTopColor,
        offsetY: borderTopWidthFloat,
      });
    }

    // 右侧描边
    const borderRightWidthFloat = parseFloat(borderRightWidth);
    if (borderRightWidthFloat !== 0) {
      style.addInnerShadow({
        color: styles.borderRightColor,
        offsetX: -borderRightWidthFloat,
      });
    }

    // 底部描边
    const borderBottomWidthFloat = parseFloat(borderBottomWidth);
    if (borderBottomWidthFloat !== 0) {
      style.addInnerShadow({
        color: styles.borderBottomColor,
        offsetY: -borderBottomWidthFloat,
      });
    }

    // 左侧描边
    const borderLeftWidthFloat = parseFloat(borderLeftWidth);
    if (borderLeftWidthFloat !== 0) {
      style.addInnerShadow({
        color: styles.borderLeftColor,
        offsetX: borderLeftWidthFloat,
      });
    }
  }

  rect.style = style;

  // TODO borderRadius can be expressed in different formats and use various units -
  // for simplicity we assume "X%"

  rect.cornerRadius = {
    topLeft: Rectangle.parseBorderRadius(
      styles.borderTopLeftRadius,
      width,
      height,
    ),
    topRight: Rectangle.parseBorderRadius(
      styles.borderTopRightRadius,
      width,
      height,
    ),
    bottomLeft: Rectangle.parseBorderRadius(
      styles.borderBottomLeftRadius,
      width,
      height,
    ),
    bottomRight: Rectangle.parseBorderRadius(
      styles.borderBottomRightRadius,
      width,
      height,
    ),
  };

  // 解析背景填充
  const backgroundImageResult = parseBackgroundImage(styles.backgroundImage);

  if (backgroundImageResult) {
    switch (backgroundImageResult.type) {
      // Image 类型的背景填充
      case 'Image': {
        const {
          backgroundPositionX,
          backgroundPositionY,
          backgroundSize,
        } = styles;

        let url = backgroundImageResult.value as string;

        if (url.startsWith('//')) {
          url = (location.protocol ? location.protocol : 'https') + url;
        }
        // 以 http 为开头的背景图片
        if (url.startsWith('http')) {
          const img = new Image();
          img.src = url;
          await waitForImageLoaded(img);
          // TODO add support for % values
          const bitmapX = parseFloat(backgroundPositionX);
          const bitmapY = parseFloat(backgroundPositionY);

          const actualImgSize = getActualImageSize(
            backgroundSize,
            { width: img.width, height: img.height },
            { width, height },
          );
          // 背景图片与填充的比例一直
          // 所以可以直接使用 image 填充
          if (
            bitmapX === 0 &&
            bitmapY === 0 &&
            actualImgSize.width / actualImgSize.height === width / height
          ) {
            // 如果是 svg 图像
            if (url.endsWith('svg')) {
              try {
                const data = await fetch(url);
                let svgString = await data.text();
                svgString = await optimizeSvgString(svgString);

                const svg = new Svg({
                  svgString,
                  x: 0,
                  y: 0,
                  width,
                  height,
                });

                svg.mapBasicInfo(node);
                const group = new Group({ x: 0, y: 0, width, height });

                group.name = '编组';
                group.addLayer(rect); // 变成相对坐标
                group.layers.push(svg); // 保留自身的位置

                return group;
              } catch (e) {
                console.warn(e);
                // url = errorBase64Url;
                return rect;
              }
            } else {
              await style.addImageFill(url);
            }
          } else {
            // use a Group(Shape + Bitmap) to correctly represent
            // clipping of the background image
            const bitmap = new Bitmap({
              url,
              x: bitmapX,
              y: bitmapY,
              width: actualImgSize.width,
              height: actualImgSize.height,
            });

            await bitmap.init();

            bitmap.name = 'background-image';
            rect.hasClippingMask = true;

            const group = new Group({ x: left, y: top, width, height });

            rect.name = 'Mask';

            group.name = '编组';
            group.addLayer(rect); // 变成相对坐标

            group.layers.push(bitmap); // 保留自身的位置

            return group;
          }
        }

        if (url.startsWith('data:image')) {
          // 如果是 svg
          const svgStr = base64ToSvgString(url);
          if (svgStr) {
            const divNode = document.createElement('div');
            divNode.innerHTML = svgStr;
            const svgNode = divNode.children[0] as SVGElement;

            svgNode.style.width = `${width}px`;
            svgNode.style.height = `${height}px`;

            document.body.append(divNode);

            const svg = await parseToSvg(svgNode);

            divNode.remove();
            svg.x = rect.x;
            svg.y = rect.y;

            svg.mapBasicInfo(node);
            const group = new Group({ x: left, y: top, width, height });

            group.name = '编组';
            group.addLayer(rect); // 变成相对坐标
            group.addLayer(svg); // 保留自身的位置

            return group;
          }
        }
        break;
      }

      // 线性渐变类型的背景填充
      case 'LinearGradient':
        // eslint-disable-next-line no-case-declarations
        const { angle, stops } = backgroundImageResult.value as {
          angle: string;
          stops: ColorParam[];
        };
        console.log(backgroundImageResult);
        style.addGradientFill(angle, stops);
        break;
      default:
        // 暂不支持:
        // - TODO radial gradient
        // - multiple background-image
        break;
    }
  }
  return rect;
};
