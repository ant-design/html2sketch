import FileFormat from '@sketch-hq/sketch-file-format-ts';
import { GroupLayoutType } from '../type';

const containsAllItems = (needles: any[], haystack: string | any[]) =>
  needles.every((needle) => haystack.includes(needle));

/**
 * 调整尺寸变量基础参数
 */
export enum ResizingConstraint {
  /**
   * 无
   */
  None = 63,
  /**
   * 上
   */
  Top = 31,
  /**
   * 右
   */
  Right = 62,
  /**
   * 下
   */
  Bottom = 55,
  /**
   * 左
   */
  Left = 59,
  /**
   * 定宽度
   */
  Width = 61,
  /**
   * 定高度
   */
  Height = 47,
}

/**
 * 计算 Resizing 变量
 */
export const calcResizingConstraint = (...args: ResizingConstraint[]) => {
  const noHeight = [
    ResizingConstraint.Top,
    ResizingConstraint.Bottom,
    ResizingConstraint.Height,
  ];
  const noWidth = [
    ResizingConstraint.Left,
    ResizingConstraint.Right,
    ResizingConstraint.Width,
  ];
  const validValues = Object.values(ResizingConstraint);

  if (!args.every((arg) => validValues.includes(arg))) {
    throw new Error('Unknown resizing constraint');
  } else if (containsAllItems(noHeight, args)) {
    throw new Error("Can't fix height when top & bottom are fixed");
  } else if (containsAllItems(noWidth, args)) {
    throw new Error("Can't fix width when left & right are fixed");
  }

  return args.length > 0
    ? // eslint-disable-next-line no-bitwise
      args.reduce((acc, item) => acc & item, args[0])
    : ResizingConstraint.None;
};

/**
 * 智能布局参数
 */
export const GroupLayout = {
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
  layoutType?: GroupLayoutType,
): FileFormat.InferredGroupLayout | FileFormat.FreeformGroupLayout => {
  switch (layoutType) {
    case GroupLayout.LEFT_TO_RIGHT: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Min,
      };
    }

    case GroupLayout.HORIZONTALLY_CENTER: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Middle,
      };
    }

    case GroupLayout.RIGHT_TO_LEFT: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Horizontal,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Max,
      };
    }

    case GroupLayout.TOP_TO_BOTTOM: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Min,
      };
    }

    case GroupLayout.VERTICALLY_CENTER: {
      return {
        _class: FileFormat.ClassValue.MSImmutableInferredGroupLayout,
        axis: FileFormat.InferredLayoutAxis.Vertical,
        layoutAnchor: FileFormat.InferredLayoutAnchor.Middle,
      };
    }

    case GroupLayout.BOTTOM_TO_TOP: {
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
