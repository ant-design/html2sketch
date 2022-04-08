const menus = {
  '/guide': [
    {
      title: '快速上手',
      children: ['guide/index.md'],
    },
    {
      title: '开发介绍',
      children: ['guide/framework.md', 'guide/install.md', 'guide/test.md'],
    },
  ],
  '/sketch': [
    {
      title: 'Sketch 组件',
      children: ['sketch/button.md'],
    },
  ],
  '/e2e': [
    {
      title: '简介',
      children: ['e2e/index.md', 'e2e/svg.md'],
    },
    {
      title: '基础用例解析',
      children: [
        'e2e/basic/position.md',
        'e2e/basic/pseudo.md',
        'e2e/basic/text.md',
        'e2e/basic/background.md',
        'e2e/basic/image.md',
        'e2e/basic/canvas.md',
      ],
    },
    {
      title: '特殊样式',
      children: ['e2e/styles/gradient.md', 'e2e/styles/transform.md'],
    },
    {
      title: 'Svg 解析',
      children: [
        'e2e/svg/basic.md',
        'e2e/svg/icon.md',
        'e2e/svg/illustration.md',
      ],
    },
    {
      title: 'Ant Design 组件',
      children: [
        'e2e/components/tabs.md',
        'e2e/components/procard.md',
        'e2e/components/radio.md',
        'e2e/components/table.md',
        'e2e/components/modal.md',
      ],
    },
  ],
};

export default menus;
