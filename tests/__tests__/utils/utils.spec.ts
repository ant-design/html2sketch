import { uuid } from 'html2sketch/utils/utils';

describe('uuid', () => {
  beforeAll(() => {
    window.IS_TEST_ENV = true;
  });
  afterAll(() => {
    window.IS_TEST_ENV = false;
  });
  it('uuid', () => {
    expect(uuid()).toBe('UUID');
  });
});
