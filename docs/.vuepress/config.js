const { nav, footer, icons } = require('./themeConf')

module.exports = {
  base: '/FEE-doc/',
  dest: './dist/',
  title: 'FEE',
  description: '贝壳前端架构组出品',
  extraWatchFiles: ['.vuepress/*.js', '.vuepress/**/*.js'],
  locales: {
    // 键名是该语言所属的子路径
    '/zh/': {
      lang: 'zh-CN',
      title: 'FEE开源项目文档',
      description: '贝壳前端架构组项目开源文档（中文）'
    },
    '/en/': {
      lang: 'en-US',
      title: 'FEE DOCS',
      description: '贝壳前端架构组项目开源文档（English）'
    }
  },
  themeConfig: {
    logo: '/images/icons/logo.png',
    smoothScroll: true,
    nav: nav,
    footer: footer,
    lastUpdated: 'Last Updated',
    // git仓库相关配置参考 【https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%B8%8A-%E4%B8%8B%E4%B8%80%E7%AF%87%E9%93%BE%E6%8E%A5】
    repo: 'https://github.com/aa978563552/FEE-doc',
    repoLabel: 'GitHub',
    editLinks: true, // 默认是 false, 设置为 true 来启用
    editLinkText: '帮助我们改善此页面！', // 默认为 "Edit this page"
    locales: {
      // 键名是该语言所属的子路径
      '/zh/': {
        lang: 'zh-CN',
        label: '简体中文',
        selectText: '切换语言',
        ariaLabel: 'Languages',
        lastUpdated: '上次编辑时间',
        editLinkText: '在 GitHub 上编辑此页',
        sidebar: {
          '/zh/guide/': ['/zh/guide/', '/zh/arms/1.0/', '/zh/arms/2.0/', '/zh/qingchan/'],
          '/zh/arms/1.0/': [
            '/zh/arms/1.0/',
            {
              title: '灯塔',
              collapsable: false,
              children: ['/zh/arms/1.0/client', '/zh/arms/1.0/server']
            }
          ],
          '/zh/arms/2.0/': [
            '/zh/arms/2.0/',
            {
              title: '灯塔',
              collapsable: false,
              children: ['/zh/arms/2.0/client', '/zh/arms/2.0/server']
            }
          ],
          '/zh/qingchan/': [
            '/zh/qingchan/',
            {
              title: '青蝉',
              collapsable: false,
              children: ['/zh/qingchan/01']
            }
          ]
        }
      },
      '/en/': {
        lang: 'en-US',
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Languages'
      }
    }
  },
  // plugins: {
  //   '@vuepress/medium-zoom': {
  //     selector: 'img',
  //     // medium-zoom options here
  //     // See: https://github.com/francoischalifour/medium-zoom#options
  //     options: {
  //       margin: 16
  //     }
  //   }
  // },
  plugins: ['@vuepress/back-to-top', '@vuepress/nprogress'],
  markdown: {
    lineNumbers: true
  }
}
