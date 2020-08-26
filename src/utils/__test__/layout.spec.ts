import { calcResizingConstraint, ResizingConstraint } from '../layout';

describe('calcResizingConstraint', () => {
  it('约束:左右 顶部 高度', () => {
    const constraint = [
      ResizingConstraint.Height,
      ResizingConstraint.Left,
      ResizingConstraint.Top,
      ResizingConstraint.Right,
    ];
    expect(calcResizingConstraint(...constraint)).toBe(10);
  });
  it('约束:左右 顶部', () => {
    const constraint = [
      ResizingConstraint.Top,
      ResizingConstraint.Left,
      ResizingConstraint.Right,
    ];
    expect(calcResizingConstraint(...constraint)).toBe(26);
  });
  it('约束:左右', () => {
    const constraint = [ResizingConstraint.Left, ResizingConstraint.Right];
    expect(calcResizingConstraint(...constraint)).toBe(58);
  });
});
