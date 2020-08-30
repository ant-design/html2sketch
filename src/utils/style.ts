export const defaultNodeStyle: Partial<CSSStyleDeclaration> = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  backgroundImage: 'none',
  borderWidth: '0px',
  boxShadow: 'none',
  // verticalAlign: 'baseline',
};

/**
 * 是否是默认样式
 */
export const isDefaultStyles = (styles: CSSStyleDeclaration) =>
  Object.keys(defaultNodeStyle).every((key) => {
    // @ts-ignore
    const defaultValue = defaultNodeStyle[key];
    // @ts-ignore
    const value = styles[key];

    return defaultValue === value;
  });
