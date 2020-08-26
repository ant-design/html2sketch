import Base from '../Base';
import { ResizingConstraint } from 'html2sketch';

class TestGroup extends Base {
  constructor() {
    super('group');
  }
}

describe('Base 类', function () {
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

    expect(a.toJSON().resizingConstraint).toBe(Width & Height);
  });
});
