import { getName } from 'html2sketch/utils/name';

describe('getName', () => {
  it('编组', () => {
    const div = 'DIV';
    const span = 'SPAN';
    const label = 'LABEL';
    expect(getName(div)).toBe('编组');
    expect(getName(span)).toBe('编组');
    expect(getName(label)).toBe('编组');
  });
  it('按钮', () => {
    const button = 'Button';
    expect(getName(button)).toBe('按钮');
  });
  it('表格相关', () => {
    expect(getName('table')).toBe('表格');
    expect(getName('Th')).toBe('表头');
    expect(getName('tr')).toBe('行');
    expect(getName('td')).toBe('单元格');
    expect(getName('tbody')).toBe('表内容');
  });
  it('其他', () => {
    expect(getName('xxx')).toBe('xxx');
  });
});
