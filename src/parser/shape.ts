import { Style, Bitmap, Group, Rectangle, Shadow } from '../model';
import { getActualImageSize, parseBackgroundImage } from '../utils/background';
import { defaultNodeStyle } from '../model/utils';
import { ColorParam } from '../model/Style/Color';

/**
 * 将节点转换为 Shape 对象
 * @param node HTML Node
 * @param styles
 */
export const parseToShape = (
  node: Element,
  styles?: CSSStyleDeclaration,
): Group | Rectangle => {
  const bcr = node.getBoundingClientRect();
  const style = new Style();

  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  if (!styles) {
    styles = getComputedStyle(node);
  }

  const {
    // 背景颜色
    backgroundColor,
    backgroundImage,
    backgroundPositionX,
    backgroundPositionY,
    backgroundSize,
    // 边框
    borderColor,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderTopColor,
    borderRightColor,
    borderBottomColor,
    borderLeftColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderBottomStyle,
    borderLeftStyle,
    borderTopStyle,
    borderRightStyle,
    boxShadow,
  } = styles;
  if (backgroundColor) {
    style.addColorFill(backgroundColor);
  }
  const rect: Rectangle | null = new Rectangle({
    width,
    height,
    x: left,
    y: top,
  });

  rect.name = node.className || 'rect';

  const isImage =
    node.nodeName === 'IMG' && (node as HTMLImageElement).currentSrc;

  if (isImage) {
    const absoluteUrl = new URL(
      (node as HTMLImageElement).currentSrc,
      location.href,
    );

    style.addImageFill(absoluteUrl.href);
    rect.setFixedWidthAndHeight();
  }

  if (boxShadow !== defaultNodeStyle.boxShadow) {
    const shadowStrings = Shadow.splitShadowString(boxShadow);

    shadowStrings.forEach((shadowString: string) => {
      const shadowObject = Shadow.shadowStringToObject(shadowString);

      if (shadowObject!.inset) {
        if (borderWidth.indexOf(' ') === -1) {
          shadowObject!.spread += parseFloat(borderWidth);
        }
        style.addInnerShadow(shadowObject);
      } else {
        style.addShadow(shadowObject);
      }
    });
  }

  // support for one-side borders (using inner shadow because Sketch doesn't support that)
  if (borderWidth.indexOf(' ') === -1) {
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
    const borderTopWidthFloat = parseFloat(borderTopWidth);
    const borderRightWidthFloat = parseFloat(borderRightWidth);
    const borderBottomWidthFloat = parseFloat(borderBottomWidth);
    const borderLeftWidthFloat = parseFloat(borderLeftWidth);

    if (borderTopWidthFloat !== 0) {
      style.addInnerShadow({
        color: borderTopColor,
        offsetY: borderTopWidthFloat,
      });
    }
    if (borderRightWidthFloat !== 0) {
      style.addInnerShadow({
        color: borderRightColor,
        offsetX: -borderRightWidthFloat,
      });
    }
    if (borderBottomWidthFloat !== 0) {
      style.addInnerShadow({
        color: borderBottomColor,
        offsetY: -borderBottomWidthFloat,
      });
    }
    if (borderLeftWidthFloat !== 0) {
      style.addInnerShadow({
        color: borderLeftColor,
        offsetX: borderLeftWidthFloat,
      });
    }
  }

  rect.style = style;

  // TODO borderRadius can be expressed in different formats and use various units - for simplicity we assume "X%"
  const cornerRadius = {
    topLeft: Rectangle.parseBorderRadius(borderTopLeftRadius, width, height),
    topRight: Rectangle.parseBorderRadius(borderTopRightRadius, width, height),
    bottomLeft: Rectangle.parseBorderRadius(
      borderBottomLeftRadius,
      width,
      height,
    ),
    bottomRight: Rectangle.parseBorderRadius(
      borderBottomRightRadius,
      width,
      height,
    ),
  };

  rect.cornerRadius = cornerRadius;

  const backgroundImageResult = parseBackgroundImage(backgroundImage);

  if (backgroundImageResult) {
    switch (backgroundImageResult.type) {
      case 'Image': {
        const img = new Image();

        img.src = <string>backgroundImageResult.value;

        // TODO add support for % values
        const bitmapX = parseFloat(backgroundPositionX);
        const bitmapY = parseFloat(backgroundPositionY);

        const actualImgSize = getActualImageSize(
          backgroundSize,
          { width: img.width, height: img.height },
          { width, height },
        );

        if (
          bitmapX === 0 &&
          bitmapY === 0 &&
          actualImgSize.width === img.width &&
          actualImgSize.height === img.height
        ) {
          // background image fits entirely inside the node, so we can represent it with a (cheaper) image fill
          style.addImageFill(<string>backgroundImageResult.value);
        } else {
          // use a Group(Shape + Bitmap) to correctly represent clipping of the background image
          const bm = new Bitmap({
            url: <string>backgroundImageResult.value,
            x: bitmapX,
            y: bitmapY,
            width: actualImgSize.width,
            height: actualImgSize.height,
          });

          bm.name = 'background-image';
          rect.hasClippingMask = true;

          const group = new Group({ x: left, y: top, width, height });

          // position is relative to the group
          group.setPosition({ x: 0, y: 0 });
          group.addLayer(group);
          group.addLayer(bm);

          return group;
        }

        break;
      }
      case 'LinearGradient':
        // eslint-disable-next-line no-case-declarations
        const { angle, stops } = backgroundImageResult.value as {
          angle: string;
          stops: ColorParam[];
        };
        style.addGradientFill(angle, stops);
        break;
      default:
        // Unsupported types:
        // - radial gradient
        // - multiple background-image
        break;
    }
  }
  return rect;
};
