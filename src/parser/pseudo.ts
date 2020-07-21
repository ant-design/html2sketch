import { Style, Rectangle, Shadow } from '../model';
import { defaultNodeStyle } from '../model/utils';

/**
 * 解析伪类
 */
const parsePseudo = (node: Element, pseudoElt: 'before' | 'after') => {
  // 判断一下是否有伪类
  const pseudoEl: CSSStyleDeclaration = getComputedStyle(node, ':' + pseudoElt);
  const { content, display } = pseudoEl;
  if (content === 'none' || display === 'none') {
    console.log(`No ${pseudoElt} Pseudo`);
    return null;
  }

  console.log('有伪类');
  const bcr = node.getBoundingClientRect();
  const { left, top } = bcr;
  const width = bcr.right - bcr.left;
  const height = bcr.bottom - bcr.top;

  const style = new Style();

  const {
    // 背景颜色
    backgroundColor,

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
  } = pseudoEl;

  if (backgroundColor) {
    style.addColorFill(backgroundColor);
  }

  const rect: Rectangle | null = new Rectangle({
    width,
    height,

    x: left,
    y: top,
  });
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
  rect.style = style;
  //TODO borderRadius can be expressed in different formats and use various units - for simplicity we assume "X%"
  const cornerRadius = {
    topLeft: Rectangle.parserBorderRadius(borderTopLeftRadius, width, height),
    topRight: Rectangle.parserBorderRadius(borderTopRightRadius, width, height),
    bottomLeft: Rectangle.parserBorderRadius(
      borderBottomLeftRadius,
      width,
      height
    ),
    bottomRight: Rectangle.parserBorderRadius(
      borderBottomRightRadius,
      width,
      height
    ),
  };

  rect.cornerRadius = cornerRadius;

  return rect;
};

export default parsePseudo;
