exports.nav = [
  {
    text: '灯塔系统',
    icon: 'el-icon-house',
    items: [
      {
        text: 'Client',
        link: '/zh/arms/Client'
      },
      {
        text: 'Server',
        link: '/zh/arms/Server'
      }
    ]
  },
  {
    text: '青蝉系统',
    link: '/zh/qingchan/',
    icon: 'el-icon-edit'
  }
]

exports.footer = {
  contact: [
    {
      type: 'github',
      link: 'https://github.com/alphawq'
    }
  ],
  copyright: [
    {
      text: 'Vuepress Theme Modern Blog',
      link: 'https://github.com/z3by/vuepress-theme-modern-blog'
    },
    {
      text: `MIT Licensed Copyright © ${new Date().getFullYear()}-present`,
      link: 'https://github.com/alphawq'
    }
  ]
}
