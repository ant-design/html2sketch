const firstUpperCase = (str: string) => {
  return str.replace(/\b(\w)(\w*)/g, function ($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
};

/**
 * 生成 symbol 名称
 **/
export const generateSymbolName = (params: {
  size: string;
  type: string;
  component: string;
  content: string;
  sizeIndex: number;
  typeIndex: number;
  componentIndex: number;
  contentIndex: number;
  suffix?: string;
  symbolName?: string;
}) => {
  const {
    content,
    component,
    size,
    type,
    contentIndex,
    componentIndex,
    sizeIndex,
    typeIndex,
    suffix,
    symbolName,
  } = params;

  if (symbolName) return symbolName;

  const contentName = contentIndex + '.' + firstUpperCase(content);
  const componentName = componentIndex + '.' + firstUpperCase(component);
  const sizeName = sizeIndex + '.' + firstUpperCase(size);
  const typeName = typeIndex + '.' + firstUpperCase(type);
  return `${contentName}/${componentName}/${sizeName}/${typeName}${
    suffix ? suffix : ''
  }`;
};
