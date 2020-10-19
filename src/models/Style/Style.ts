import { Declaration, parse as cssParse, Rule } from 'css';

import BaseStyle from '../Base/BaseStyle';
import { ColorParam } from './Color';
import Fill from './Fill';
import Shadow from './Shadow';
import InnerShadow from './InnerShadow';
import Border from './Border';
import SketchBorderOptions from './SketchBorderOptions';

import { uuid } from '../../utils/utils';
import { defaultColorControls } from '../utils';

import { AnyLayer, SketchFormat } from '../../types';

interface ShadowInput {
  color: ColorParam;
  blur?: number;
  offsetX?: number;
  offsetY?: number;
  spread?: number;
}

export interface StyleType {
  fill: string;
}

const defaultShadowInput: ShadowInput = {
  color: '#000',
  blur: 0,
  offsetX: 0,
  offsetY: 0,
  spread: 0,
};
/**
 * 样式
 */
class Style extends BaseStyle {
  /**
   * 填充
   * */
  fills: Fill[] = [];

  /**
   * 外阴影
   * */
  shadows: Shadow[] = [];

  /**
   * 内阴影
   * */
  innerShadows: InnerShadow[] = [];

  /**
   * 描边
   * */
  borders: Border[] = [];

  /**
   * Sketch 专属的描边属性
   * */
  sketchBorderOptions: SketchBorderOptions = new SketchBorderOptions();

  /**
   * 添加颜色填充
   * */
  addColorFill(color: ColorParam) {
    const fill = new Fill({
      type: SketchFormat.FillType.Color,
      color,
    });
    this.fills.push(fill);
  }

  /**
   * 添加渐变填充
   * */
  addGradientFill(angle: string, stops?: ColorParam[]) {
    const { from, to } = this.convertAngleToFromAndTo(angle);

    const fill = new Fill({
      type: SketchFormat.FillType.Gradient,
      gradient: {
        from,
        to,
        stops: stops || [],
        gradientType: SketchFormat.GradientType.Linear,
      },
    });

    this.fills.push(fill);
  }

  /**
   * 将角度转为 sketch 中的 from 和 to
   * @param {string} angle 角度
   */
  convertAngleToFromAndTo = (angle: string) => {
    // default 180deg
    const from = { x: 0.5, y: 0 };
    const to = { x: 0.5, y: 1 };

    // Learn math or find someone smarter to figure this out correctly
    switch (angle) {
      case 'to top':
      case '360deg':
      case '0deg':
        from.y = 1;
        to.y = 0;
        break;
      case 'to right':
      case '90deg':
        from.x = 0;
        from.y = 0.5;
        to.x = 1;
        to.y = 0.5;
        break;
      case 'to left':
      case '270deg':
        from.x = 1;
        from.y = 0.5;
        to.x = 0;
        to.y = 0.5;
        break;
      case 'to bottom':
      case '180deg':
      default:
        break;
    }

    return {
      from,
      to,
    };
  };

  /**
   * 添加图片填充
   * */
  async addImageFill(image: string) {
    const fill = new Fill({
      type: SketchFormat.FillType.Pattern,
      image,
    });

    // 将图片资源初始化
    if (fill.image) {
      await fill.image.init();
    }

    this.fills.push(fill);
  }

  /**
   * 添加描边
   * */
  addBorder({
    color,
    thickness,
    position,
  }: {
    thickness: number;
    color: ColorParam;
    position?: SketchFormat.BorderPosition;
  }) {
    const border = new Border({
      type: SketchFormat.FillType.Color,
      color,
      thickness,
      position,
    });

    this.borders.push(border);
  }

  /**
   * 添加阴影
   * */
  addShadow(params = defaultShadowInput) {
    const { color, blur, offsetX, offsetY, spread } = params;

    const shadow = new Shadow({
      blurRadius: blur,
      color,
      offsetX,
      offsetY,
      spread,
    });

    this.shadows.push(shadow);
  }

  /**
   * 添加内阴影
   * */
  addInnerShadow(params = defaultShadowInput) {
    const { color, blur, offsetX, offsetY, spread } = params;

    const shadow = new InnerShadow({
      blurRadius: blur,
      color,
      offsetX,
      offsetY,
      spread,
    });

    this.innerShadows.push(shadow);
  }

  /**
   * 设置描边属性
   * */
  setBorderDashed({
    lineCapStyle,
    lineJoinStyle,
    dash,
    spacing,
  }: {
    lineCapStyle?: SketchFormat.LineCapStyle;
    lineJoinStyle?: SketchFormat.LineJoinStyle;
    dash?: number;
    spacing?: number;
  } = {}) {
    if (lineCapStyle) {
      this.sketchBorderOptions.lineCap = lineCapStyle;
    }
    if (lineJoinStyle) {
      this.sketchBorderOptions.lineJoin = lineJoinStyle;
    }
    if (dash || spacing) {
      this.sketchBorderOptions.dashPattern = [dash || 4, spacing || 4];
    }
  }

  /**
   * 生成 Sketch JSON 对象
   */
  toSketchJSON(): SketchFormat.Style {
    return {
      _class: 'style',
      do_objectID: this.id,
      endMarkerType: SketchFormat.MarkerType.OpenArrow,
      miterLimit: 10,
      startMarkerType: SketchFormat.MarkerType.OpenArrow,
      windingRule: SketchFormat.WindingRule.EvenOdd,
      borderOptions: this.sketchBorderOptions.toSketchJSON(),
      colorControls: defaultColorControls,
      fills: this.fills.map((fill) => fill.toSketchJSON()),
      borders: this.borders.map((b) => b.toSketchJSON()),
      shadows: this.shadows.map((shadow) => shadow.toSketchJSON()),
      innerShadows: this.innerShadows.map((i) => i.toSketchJSON()),
      contextSettings: this.getContextSettings(),
    };
  }

  toJSON() {
    return {
      fills: this.fills.map((f) => f.toJSON()),
    };
  }

  /**
   * 获取 style 的 hash
   */
  // eslint-disable-next-line class-methods-use-this
  get hash() {
    // const { id, name, ...style } = obj; // 去掉 id 和 name 后进行 hash
    // return murmurHash(JSON.stringify(sortObjectKeys(style)));

    return '';
  }

  /**
   * 从样式字符串获得样式的 JSON 对象
   * @param style
   */
  static parseStyleString = (style: string): StyleType | undefined => {
    if (!style || style === '') {
      return;
    }
    const Arr = style
      .replace(/&quot;/g, '"') // 替换引号
      .split(';')
      .filter((item) => item !== '');
    let str = '';
    Arr.forEach((item) => {
      let test = '';
      item
        .trim()
        .split(':')
        .forEach((item2) => {
          test += `"${item2.trim()}":`;
        });
      str += `${test},`;
    });
    str = str.replace(/:,/g, ',');
    str = str.substring(0, str.lastIndexOf(','));
    str = `{${str}}`;

    return JSON.parse(str);
  };

  /**
   * 从类字符串获得样式的 JSON 对象
   * @param classStyle
   */
  static parseClassStyle = (classStyle: string) => {
    const { stylesheet } = cssParse(classStyle);
    const rules: {
      className: string;
      styles: { [x: string]: string };
    }[] = [];

    stylesheet?.rules.forEach((rule: Rule) => {
      const { selectors, declarations } = rule;
      const styles = {};
      declarations
        // 过滤出所有的声明类型
        ?.filter((d) => d.type === 'declaration')
        .forEach((declaration: Declaration) => {
          const { property, value } = declaration;
          if (!property) return;

          // 将 key 转为小驼峰模式
          const key = property.replace(/-(\w)/g, (_, letter) =>
            letter.toUpperCase(),
          );

          Object.assign(styles, { [key]: value });
        });

      // 如果 styles 中存在元素
      if (Object.keys(styles).length > 0) {
        selectors?.forEach((selector) => {
          rules.push({
            className: selector,
            styles,
          });
        });
      }
    });

    return rules;
  };

  /**
   * 解析 Border string 圆角
   * @param borderRadius
   * @param width
   * @param height
   */
  static parseBorderRadius = (
    borderRadius: string,
    width: number,
    height: number,
  ) => {
    const matches = borderRadius.match(/^([0-9.]+)(.+)$/);

    // Sketch uses 'px' units for border radius, so we need to convert % to px
    if (matches && matches[2] === '%') {
      const baseVal = Math.max(width, height);
      const percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);

      return Math.round(percentageApplied);
    }
    return parseInt(borderRadius, 10);
  };

  /**
   * 将 layer 的样式转成 Sketch 的共享样式
   * @param layer
   * @param id
   */
  static layerToSketchSharedStyle = (
    layer: AnyLayer,
    id?: string,
  ): SketchFormat.SharedStyle => {
    return {
      _class: 'sharedStyle',
      do_objectID: id || uuid(),
      name: layer.name,
      value: layer.style?.toSketchJSON(),
    };
  };
}

export default Style;
