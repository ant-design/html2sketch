import murmurHash from 'murmur2js';
import { Style } from '@/model';
import { sortObjectKeys, uuid } from '../../helpers/utils';
import { SketchFormat } from '../../index';

class StyleBase {
  constructor() {
    this.id = uuid();
  }
  id: string;
  name: string;

  /**
   * 透明度
   **/
  private _opacity: number = 1;
  get opacity() {
    return this._opacity;
  }
  set opacity(opacity: string | number) {
    this._opacity = Number(opacity);
  }

  getContextSettings = (): SketchFormat.GraphicsContextSettings => {
    return {
      _class: 'graphicsContextSettings',
      blendMode: SketchFormat.BlendMode.Normal,
      opacity: this._opacity,
    };
  };

  /**
   * 给 style 进行 hash
   * 便于判断是否是相同属性的样式
   * @param obj
   */
  static hashStyle = (obj: Style) => {
    if (!obj) {
      return -1;
    }

    const { id, name, ...style } = obj; // 去掉 id 和 name 后进行 hash
    murmurHash(JSON.stringify(sortObjectKeys(style)));
  };
}

export default StyleBase;
