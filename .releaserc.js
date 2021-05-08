module.exports = {
  plugins: [
    //负责解析 commit
    [
      '@semantic-release/commit-analyzer',
      {
        // 自定义配置，如果不填则是默认的 conventional-changelog-angular
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    [
      '@semantic-release/release-notes-generator', //此处生成 github-release 的日志
      {
        //指定配置，这里才是负责生成日志的，也就是说，如果自定义了writerOpts，只有在这里写才会生效
        config: 'conventional-changelog-gitmoji-config',
      },
    ],
    [
      '@semantic-release/changelog', //此处会调用上一个插件生成的新增日志，然后合并到原有日志中
      {
        changelogFile: 'CHANGELOG.md',
        changelogTitle: '# html2sketch 更新日志',
      },
    ],
    '@semantic-release/npm', // 如果是npm包会自动更新版本号并发布
    ['@semantic-release/github'], // 推送代码回到GitHub
    [
      '@semantic-release/git', //发布release
      {
        assets: ['CHANGELOG.md', 'package.json'],
        message:
          ':bookmark: chore(release): ${nextRelease.gitTag} [skip ci] \n\n${nextRelease.notes}',
      },
    ],
  ],
};
