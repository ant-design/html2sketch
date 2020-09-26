import Color from 'color';
import { Style, Bitmap, Group, Rectangle, Shadow, Svg, Frame } from '../model';
import { defaultNodeStyle } from '../model/utils';
import { ColorParam } from '../model/Style/Color';
import {
  getActualImageSize,
  parseBackgroundImageType,
} from '../utils/background';
import { base64ToSvgString, waitForImageLoaded } from '../utils/image';
import { getRenderedSvgString } from '../utils/svg';

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
    topLeft: Style.parseBorderRadius(styles.borderTopLeftRadius, width, height),
    topRight: Style.parseBorderRadius(
      styles.borderTopRightRadius,
      width,
      height,
    ),
    bottomLeft: Style.parseBorderRadius(
      styles.borderBottomLeftRadius,
      width,
      height,
    ),
    bottomRight: Style.parseBorderRadius(
      styles.borderBottomRightRadius,
      width,
      height,
    ),
  };

  // 解析背景填充
  const backgroundImageResult = parseBackgroundImageType(
    styles.backgroundImage,
  );

  if (backgroundImageResult) {
    switch (backgroundImageResult.type) {
      // Image 类型的背景填充
      case 'Image': {
        let url = backgroundImageResult.value as string;

        // 没有带协议头的话
        if (url.startsWith('//')) {
          url = (location.protocol ? location.protocol : 'https') + url;
        }

        // 获取实际的图片尺寸
        const img = new Image();
        img.src = url;
        await waitForImageLoaded(img); // 加载下这个图片来获取真实图片尺寸

        const actualImgSize = getActualImageSize(
          styles.backgroundSize,
          { width: img.width, height: img.height },
          { width, height },
        );

        ///  获取图片真实坐标  ///

        const getPositionNum = (position: string, type: 'x' | 'y') => {
          // 解析百分比值
          // 这个百分比应该是图片中心的百分比值
          if (position.endsWith('%')) {
            const { width: aW, height: aH } = actualImgSize;

            const unit = type === 'x' ? width : height;
            const size = type === 'x' ? aW : aH;

            if (unit * parseFloat(position) !== 0) {
              return (unit * parseFloat(position)) / 100 - size / 2;
            }
            return unit * parseFloat(position);
          }
          // 解析实际值
          return parseFloat(position);
        };

        const bitmapX = getPositionNum(styles.backgroundPositionX, 'x');
        const bitmapY = getPositionNum(styles.backgroundPositionY, 'y');

        /// 针对 svg 类型的 background 进行解析 ///
        let isSvgBackground = false;
        let svg: Svg | undefined;

        // 外联型 svg
        if (url.startsWith('http') && url.endsWith('svg')) {
          svg = await Svg.initFromUrl(
            url,
            new Frame({ x: rect.x, y: rect.y, width, height }),
          );
          isSvgBackground = true;
        }

        // 内联型 svg
        if (url.startsWith('data:image')) {
          // 如果是 svg类型的 data image
          const rawString = base64ToSvgString(url);
          if (rawString) {
            const svgString = await getRenderedSvgString(rawString, {
              width,
              height,
            });
            svg = new Svg({ svgString, x: rect.x, y: rect.y, height, width });
            svg.mapBasicInfo(node);
            isSvgBackground = true;
          }
        }

        // 如果是 Svg 图像
        // 直接采用Svg + background 的方式
        if (isSvgBackground && svg) {
          try {
            svg.mapBasicInfo(node);

            const group = new Group({ x: left, y: top, width, height });

            group.name = '编组';
            group.addLayer(rect); // 变成相对坐标
            group.addLayer(svg); // 保留自身的位置

            return group;
          } catch (e) {
            console.warn(e);
            return rect;
          }
        }

        /// 如果不是 Svg 则是图片填充 ///

        // 背景图片与填充的比例一致
        // 可以直接使用 Svg 或 Image
        // 则不用 background-fill
        if (
          bitmapX === 0 &&
          bitmapY === 0 &&
          actualImgSize.width / actualImgSize.height === width / height
        ) {
          await style.addImageFill(url);
        } else {
          // use a Group(Shape + Bitmap) to correctly represent
          // clipping of the background image
          const image = new Bitmap({
            url,
            x: bitmapX,
            y: bitmapY,
            width: actualImgSize.width,
            height: actualImgSize.height,
          });

          await image.init();

          image.name = '背景图片';

          rect.hasClippingMask = true;

          const group = new Group({ x: left, y: top, width, height });

          rect.name = 'Mask';

          group.name = '编组';
          group.addLayer(rect); // 变成相对坐标

          group.layers.push(image); // 保留自身的位置

          return group;
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
