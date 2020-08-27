import { ResizingConstraint } from 'html2sketch';
import BaseLayer from '../BaseLayer';

class TestGroup extends BaseLayer {
  constructor() {
    super('group');
  }
}

describe('Base图层 类', function () {
  test('setName', () => {
    const a = new TestGroup();
    const name = 'test/name-should-work';

    a.name = name;

    expect(a.toJSON().name).toBe(name);
  });
  test('setObjectID', () => {
    const a = new TestGroup();
    const id = 'test/name-should-work';

    a.id = id;

    expect(a.toJSON().id).toBe(id);
  });

  test('setResizingConstraint', () => {
    const a = new TestGroup();
    const { Top, Left } = ResizingConstraint;
    const resizingConstraint = [Top, Left];

    a.setResizingConstraint(...resizingConstraint);

    // eslint-disable-next-line no-bitwise
    expect(a.toJSON().resizingConstraint).toBe(Top & Left);
  });

  test('setIsLocked', () => {
    const a = new TestGroup();

    a.locked = true;

    expect(a.toJSON().locked).toBe(true);
  });

  test('setFixedWidthAndHeight', () => {
    const a = new TestGroup();
    const { Width, Height } = ResizingConstraint;

    a.setFixedWidthAndHeight();

    // eslint-disable-next-line no-bitwise
    expect(a.toJSON().resizingConstraint).toBe(Width & Height);
  });
});
