import {
  calcResizingConstraint,
  ResizingConstraint,
  getGroupLayout,
} from '../layout';

describe('calcResizingConstraint', () => {
  it('约束:左 右 顶 高度', () => {
    const constraint = [
      ResizingConstraint.Height,
      ResizingConstraint.Left,
      ResizingConstraint.Top,
      ResizingConstraint.Right,
    ];
    expect(calcResizingConstraint(...constraint)).toBe(10);
  });
  it('约束:左 右 顶', () => {
    const constraint = [
      ResizingConstraint.Top,
      ResizingConstraint.Left,
      ResizingConstraint.Right,
    ];
    expect(calcResizingConstraint(...constraint)).toBe(26);
  });
  it('约束:左 右', () => {
    const constraint = [ResizingConstraint.Left, ResizingConstraint.Right];
    expect(calcResizingConstraint(...constraint)).toBe(58);
  });
  it('没约束 给定默认', () => {
    expect(calcResizingConstraint()).toBe(ResizingConstraint.None);
  });

  describe('错误的布局参数会报错', () => {
    it('约束:顶 底 高度 , 会报错', () => {
      const { Top, Bottom, Height } = ResizingConstraint;

      expect(() => calcResizingConstraint(Top, Bottom, Height)).toThrow();
    });
    it('undefined 参数会报错', () => {
      // @ts-ignore
      const { Top, wat } = ResizingConstraint;

      expect(() => calcResizingConstraint(Top, wat)).toThrow();
    });
    it('约束:左 右 宽度 ,会报错', () => {
      const { Left, Right, Width } = ResizingConstraint;

      expect(() => calcResizingConstraint(Left, Right, Width)).toThrow();
    });
  });
});

describe('getGroupLayout', function () {
  const defaultGroupLayout = {
    _class: 'MSImmutableFreeformGroupLayout',
  };

  it('没传参时返回默认的布局', () => {
    expect(getGroupLayout()).toEqual(defaultGroupLayout);
  });

  it('布局预期', () => {
    expect(getGroupLayout('NONE')).toEqual(defaultGroupLayout);

    // HORIZONTALLY 横向
    expect(getGroupLayout('RIGHT_TO_LEFT')).not.toEqual(defaultGroupLayout);
    expect(getGroupLayout('LEFT_TO_RIGHT')).not.toEqual(defaultGroupLayout);
    expect(getGroupLayout('HORIZONTALLY_CENTER')).not.toEqual(
      defaultGroupLayout,
    );
    // VERTICALLY 纵向
    expect(getGroupLayout('BOTTOM_TO_TOP')).not.toEqual(defaultGroupLayout);
    expect(getGroupLayout('TOP_TO_BOTTOM')).not.toEqual(defaultGroupLayout);
    expect(getGroupLayout('VERTICALLY_CENTER')).not.toEqual(defaultGroupLayout);
  });
});
