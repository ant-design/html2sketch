import FileFormat from '@sketch-hq/sketch-file-format-ts';
const containsAllItems = (needles: any[], haystack: string | any[]) =>
  needles.every((needle) => haystack.includes(needle));

/**
 * 计算 Resizing 变量
 */
export const calculateResizingConstraintValue = (
  ...args: RESIZING_CONSTRAINTS[]
) => {
  const noHeight = [
    RESIZING_CONSTRAINTS.TOP,
    RESIZING_CONSTRAINTS.BOTTOM,
    RESIZING_CONSTRAINTS.HEIGHT,
  ];
  const noWidth = [
    RESIZING_CONSTRAINTS.LEFT,
    RESIZING_CONSTRAINTS.RIGHT,
    RESIZING_CONSTRAINTS.WIDTH,
  ];
  const validValues = Object.values(RESIZING_CONSTRAINTS);

  if (!args.every((arg) => validValues.includes(arg))) {
    throw new Error('Unknown resizing constraint');
  } else if (containsAllItems(noHeight, args)) {
    throw new Error("Can't fix height when top & bottom are fixed");
  } else if (containsAllItems(noWidth, args)) {
    throw new Error("Can't fix width when left & right are fixed");
  }

  return args.length > 0
    ? args.reduce((acc, item) => acc & item, args[0])
    : RESIZING_CONSTRAINTS.NONE;
};
/**
 * 调整尺寸变量基础参数
 */
export enum RESIZING_CONSTRAINTS {
  /**
   * 无
   */
  NONE = 63,
  /**
   * 上
   */
  TOP = 31,
  /**
   * 右
   */
  RIGHT = 62,
  /**
   * 下
   */
  BOTTOM = 55,
  /**
   * 左
   */
  LEFT = 59,
  /**
   * 定宽度
   */
  WIDTH = 61,
  /**
   * 定高度
   */
  HEIGHT = 47,
}

/**
 * 智能布局参数
 */
export const SMART_LAYOUT = {
  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
  HORIZONTALLY_CENTER: 'HORIZONTALLY_CENTER',
  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
  VERTICALLY_CENTER: 'VERTICALLY_CENTER',
  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};

/**
 * 获取布局参数
 * @param layoutType
 */
export const getGroupLayout = (
  layoutType?: keyof typeof SMART_LAYOUT,
): FileFormat.InferredGroupLayout | FileFormat.FreeformGroupLayout => {
  switch (layoutType) {
    case SMART_LAYOUT.LEFT_TO_RIGHT: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Min,
      };
    }

    case SMART_LAYOUT.HORIZONTALLY_CENTER: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Middle,
      };
    }

    case SMART_LAYOUT.RIGHT_TO_LEFT: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Max,
      };
    }

    case SMART_LAYOUT.TOP_TO_BOTTOM: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Min,
      };
    }

    case SMART_LAYOUT.VERTICALLY_CENTER: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Middle,
      };
    }

    case SMART_LAYOUT.BOTTOM_TO_TOP: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Max,
      };
    }

    default:
      return {
        _class: FileFormat.ClassValue.MSImmutableFreeformGroupLayout,
      };
  }
};
