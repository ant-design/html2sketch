import {
  matrixToRotation,
  transformStrToMatrix,
} from 'html2sketch/utils/matrix';

describe('matrixToRotation', () => {
  it('矩阵转角度', () => {
    expect(matrixToRotation(0.707107, 0.707107, -0.707107, 0.707107)).toBe(45);
    expect(matrixToRotation(0, 0, 0, 0)).toBe(0);
  });
});

describe('transformStrToMatrix', () => {
  it('rotate', () => {
    expect(transformStrToMatrix('rotate(15 433.82 3647.357)')).toStrictEqual({
      a: 0.9659258262890683,
      b: 0.25881904510252074,
      c: -0.25881904510252074,
      d: 0.9659258262890683,
      e: 958.787513927271,
      f: 11.999797857406975,
    });
  });
});
