import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { Declaration, parse as cssParse, Rule } from 'css';
import { defaultBorderOptions, defaultColorControls } from '../utils';
import { ColorParam } from './Color';
import BaseStyle from '../Base/BaseStyle';
import Fill from './Fill';
import Shadow from './Shadow';
import InnerShadow from './InnerShadow';
import Border from './Border';

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
  sketchBorderOptions: SketchFormat.BorderOptions = defaultBorderOptions;

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
  addBorder({ color, thickness }: { thickness: number; color: ColorParam }) {
    const border = new Border({
      type: SketchFormat.FillType.Color,
      color,
      thickness,
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
    this.sketchBorderOptions = {
      _class: 'borderOptions',
      lineCapStyle: lineCapStyle || SketchFormat.LineCapStyle.Butt,
      lineJoinStyle: lineJoinStyle || SketchFormat.LineJoinStyle.Miter,
      dashPattern: [dash || 4, spacing || 4],
      isEnabled: true,
    };
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
      borderOptions: this.sketchBorderOptions,
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
}

export default Style;
