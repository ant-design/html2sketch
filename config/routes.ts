interface RouteItem {
  title: string;
  link: string;
}

interface SideBarRoute {
  title?: string;
  children: RouteItem[];
}

const basic: SideBarRoute = {
  title: '基础用例解析',
  children: [
    {
      title: '坐标与尺寸解析',
      link: '/e2e/basic/position',
    },
    {
      title: '伪类解析',
      link: '/e2e/basic/pseudo',
    },
    {
      title: '文本解析',
      link: '/e2e/basic/text',
    },
    {
      title: '背景图片解析',
      link: '/e2e/basic/background',
    },
    {
      title: '图片解析',
      link: '/e2e/basic/image',
    },
    {
      title: 'Canvas 解析',
      link: '/e2e/basic/canvas',
    },
    {
      title: 'Overflow 解析',
      link: '/e2e/basic/overflow',
    },
  ],
};

const svg: SideBarRoute = {
  title: 'Svg 解析',
  children: [
    {
      title: 'Svg 解析逻辑',
      link: '/e2e/svg',
    },
    {
      title: '基础解析',
      link: 'e2e/svg/basic',
    },
    {
      title: 'Icon 解析',
      link: 'e2e/svg/icon',
    },
    {
      title: 'Illustration 解析',
      link: 'e2e/svg/illustration',
    },
  ],
};

const styles: SideBarRoute = {
  title: '特殊样式',
  children: [
    {
      title: '渐变解析',
      link: 'e2e/styles/gradient',
    },
    {
      title: 'Transform 解析',
      link: 'e2e/styles/transform',
    },
  ],
};

const antdComponents: SideBarRoute = {
  title: '组件库测试',
  children: [
    {
      title: 'Ant Design',
      link: 'e2e/components/ant-design',
    },
    {
      title: 'ProComponents',
      link: 'e2e/components/pro-components',
    },
    {
      title: 'Modal 浮层',
      link: 'e2e/components/modal',
    },
  ],
};

const goBack: SideBarRoute = {
  children: [{ title: '🔙 返回上级', link: '/e2e' }],
};

export const sidebar = {
  '/guide': [
    {
      title: '快速上手',
      children: [
        {
          title: '介绍',
          link: '/guide',
        },
      ],
    },
    {
      title: '开发介绍',
      children: [
        {
          title: '依赖安装',
          link: '/guide/install',
        },
        {
          title: '架构说明',
          link: '/guide/framework',
        },
        {
          title: '测试说明',
          link: '/guide/test',
        },
      ],
    },
  ],
  '/sketch': [
    {
      title: 'Sketch 组件',
      children: [
        {
          title: '按钮',
          link: '/sketch/button',
        },
      ],
    },
  ],
  '/e2e': [
    {
      title: '简介',
      children: [
        {
          title: '测试用例说明',
          link: '/e2e',
        },
      ],
    },
    basic,
    styles,
    svg,
    antdComponents,
  ],
  '/e2e/basic': [goBack, basic],
  '/e2e/styles': [goBack, styles],
  '/e2e/svg': [goBack, svg],
  '/e2e/components': [goBack, antdComponents],
};

export const nav: RouteItem[] = [
  { title: '指南', link: '/guide' },
  { title: 'sketch组件', link: '/sketch/button' },
  { title: '解析用例', link: '/e2e' },
  {
    title: 'GitHub',
    link: 'https://github.com/ant-design/html2sketch',
  },
];
