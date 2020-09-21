import { matrixToRotation } from 'html2sketch/utils/matrix';

describe('matrixToRotation', () => {
  it('矩阵转角度', () => {
    expect(matrixToRotation(0.707107, 0.707107, -0.707107, 0.707107)).toBe(45);
    expect(matrixToRotation(0, 0, 0, 0)).toBe(0);
  });
});
