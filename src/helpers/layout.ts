import FileFormat from '@sketch-hq/sketch-file-format-ts';
const containsAllItems = (needles: any[], haystack: string | any[]) =>
  needles.every((needle) => haystack.includes(needle));

/**
 * 计算 Resizing 变量
 */
export const calculateResizingConstraintValue = (...args: any[]) => {
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
 * 自动布局变量参数
 */
export enum RESIZING_CONSTRAINTS {
  TOP = 31,
  RIGHT = 62,
  BOTTOM = 55,
  LEFT = 59,
  WIDTH = 61,
  HEIGHT = 47,
  NONE = 63,
}

//*智能布局参数
export const SMART_LAYOUT = {
  LEFT_TO_RIGHT: 'LEFT_TO_RIGHT',
  HORIZONTALLY_CENTER: 'HORIZONTALLY_CENTER',
  RIGHT_TO_LEFT: 'RIGHT_TO_LEFT',
  TOP_TO_BOTTOM: 'TOP_TO_BOTTOM',
  VERTICALLY_CENTER: 'VERTICALLY_CENTER',
  BOTTOM_TO_TOP: 'BOTTOM_TO_TOP',
};

export const getGroupLayout = (
  layoutType?: keyof typeof SMART_LAYOUT
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
