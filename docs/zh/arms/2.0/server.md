---
title: Server端
date: 2020-03-20
author: Aphasia
---

# 环境搭建

1.  [Node.js](http://nodejs.cn/)
2.  Docker(访问不了请联系@姚泽源 开通权限)

    1.  [Docker PHP 环境](http://git.example.com/yaozeyuan001/docker)
        1.  Docker 软件 + 基础 PHP 运行环境(需要使用里边的 adminer 管理数据库)
    2.  [Docker 开发套件](http://git.example.com/yaozeyuan001/ha_develope_env)
        1.  MongoDB-4.0/MySQL/Redis/Memcache-1.5
    3.  一键启动命令

        1.  Mac

            ```bash
            docker-compose -f ~/www/docker/docker-compose.yml up -d && docker-compose -f ~/www/ha_develope_env/docker-compose.yml up -d

            ```

        2.  Windows

            ```bash
            docker-compose -f F:/www/docker/docker-compose.yml up -d ; docker-compose -f F:/www/ha_develope_env/docker-compose.yml up -d

            ```

3.  克隆项目

    ```bash
        echo '创建项目'                                                      \
    &&  mkdir -p ~/www/plat-fe                                              \
    &&  cd ~/www/plat-fe                                                    \
    &&  git clone git@git.example.com:plat-fe/fee-rd                        \
    &&  cd server                                                           \
    &&  npm i --registry=http://registry.npmjs.example.com:7001/            \
    &&  echo '创建完成'

    ```

4.  创建 platform 数据库, 然后执行`npm run fee Utils:GenerateSQL 1,2,3,4,5,6,7,8,9,10 '2018-01' '2020-10' > init.sql` 生成数据库 SQL, 执行`mysql -u root -h 127.0.0.1 platform -p < init.sql`, 执行建表语句
5.  启动项目 => `npm run watch` 启动 babel 监控, `npm run dev` 启动项目.
6.  访问 http://localhost:3000/ 查看效果
7.  构建完成后, 目录结构如下

```text
-   主目录(~)
    -   www
        -   plat-fe
            -   fee-rd          =>  项目路径
        -   docker              =>  [辅助]docker所在路径
        -   ha_develope_env     =>  [辅助]ha_develope_env所在路径
        -   htdocs_in_docker    =>  [辅助]php相关代码目录(指向~/www/docker/base/data0/www/htdocs的快捷方式)

```

# 任务执行周期

    1.  每分钟一次(准实时)
        1.  原始数据入库
            1.  错误数据入库(延迟2分钟)
        2.  按分钟统计
            1.  错误数据统计(延迟2分钟)
    2.  每10分钟一次
        1.  原始数据入库
            1.  uv
            2.  页面性能指标
            3.  用户停留时长
        4.  按小时统计
            1.  uv
            2.  新用户数
            3.  页面性能指标
            4.  错误数据统计
    3.  每小时一次
        1.  原始数据入库
            1.  设备数据
            2.  用户点击
            3.  首次登陆用户
        1.  按天统计(当天)
            1.  uv
            2.  新用户数
            3.  页面性能指标
            4.  错误数据统计
            5.  用户停留时长
    4.  每六小时一次
        1.  按天统计(昨日)
            1.  uv
            2.  新用户数
            3.  页面性能指标
            4.  错误数据统计
            5.  用户停留时长
        2.  按月统计
            1.  uv
            2.  新用户数
            3.  页面性能指标
            4.  错误数据统计
            5.  用户停留时长

            1.  操作系统分布
            2.  设备分布
            3.  浏览器分布

# 开发说明

1.  代码规范(Code Review CheckList)

    1.  优先保证项目代码质量. 代码质量的检测标准为: _理解代码所需时间最短_
    2.  使用[JS Standard](https://standardjs.com/readme-zhcn.html)保证基础代码风格. 使用方法:

        1.  安装 eslint 插件
        2.  点击设置->搜索 settings.json，将如下配置填入进去

            ```json
                // eslint配置
                "eslint.autoFixOnSave": true,
                "eslint.options": {
                "extensions": [
                    ".html",
                    ".js",
                    ".vue",
                    ".jsx"
                ]
                },
                "eslint.validate": [
                {
                    "language": "html",
                    "autoFix": true
                },
                {
                    "language": "vue",
                    "autoFix": true
                },
                {
                    "language": "javascript",
                    "autoFix": true
                },
                {
                    "language": "javascriptreact",
                    "autoFix": true
                }
                ],

            ```

    3.  代码风格方面, Code Review 只检查以下部分, 其余一律不检查

        1.  功能正确无误
        2.  实现代码没有可能引起误解的部分
        3.  如无必要, 变量名中不使用缩写(msg/pwd/pkg...)
        4.  禁用单字母变量, 变量名不得少于三个字母
        5.  增删改查接口命名规范为:
            1.  add
            2.  update
            3.  delete
            4.  get
            5.  getList
        6.  方法长度不得超过 150 行
        7.  每个 model 对应一张表, model 中均有以下变量
            1.  常量
                1.  TABLE_NAME
                2.  TABLE_COLUMN
            2.  方法
                1.  getTableName
                    1.  参数:
                        1.  projectId
                        2.  queryAt(时间戳)
        8.  操作 moment 对象前必须先调用 moment 的 clone 方法, 避免操作行为修改对象本身
        9.  asnyc 方法名前, 统一添加 async 前缀, 避免和普通方法混淆

    4.  禁止使用`someArray.map`/`someArray.forEach`方式遍历数组, 统一使用`for(let item of someArray)`遍历
    5.  待做功能使用@todo(xxx)标记, xxx 为 todo 创建者的名字
    6.  只能使用下划线方式为文件命名, 禁止使用驼峰式文件名.(Windows/Mac 不区分文件名大小写)
    7.  导出方式统一为:
        via [airbnb 代码规范-10.1~10.6](https://github.com/airbnb/javascript#modules), [named-export-vs-default-export](https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910)

        ```js
        export default {
            get(){
                // ...
            }

            update(){
                // ...
            }

            // ...
        }

        ```

2.  提交规范

    1.  提交时遵循简化版的[Angular 规范](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
    2.  频繁提交, 一次提交一处修改. 而不是每次提交 5000 行修改, 然后想起来 5000 行里有一个字母打错了, 还不知道是哪里错的
    3.  不能直接向 dev/master 上提交代码, 需要先提 Merge Request, 然后再合并到 dev/master 上
    4.  分支命名方式为 dev*姓名拼音缩写*分支功能说明(可以是中文)
    5.  commit 前加上以下关键字, 标注提交类型

        | 关键字 | 功能          |
        | ------ | ------------- |
        | feat   | 添加新功能    |
        | format | 调整代码格式  |
        | fix    | 修复错误      |
        | doc    | 修订文档/注释 |

3)  发布规范

    1.  dev 分支发布到 10.30.130.155 (姚泽源开发机), 发布命令

        1.  ```bash
            cd /data0/www/htdocs/fee-rd/                            \
            && git checkout -f dev                                  \
            && git pull                                             \
            && git merge origin/dev                                 \
            && npm install                                          \
            && npm run build                                        \
            && echo "pm2 会自动监控文件变动, 如果没有启动, 请单独执行"  \
            && echo "pm2 restart fee-app --watch=true"              \
            && echo "pm2 restart fee-task-manager --watch=true"     \
            && echo "查看pm2执行情况"                                \
            && pm2 status

            ```

        2.  pm2 配置初始化命令
            1.  `npm i -g pm2`
            2.  `cd /data0/www/htdocs/fee-rd/`
            3.  `pm2 start pm2_fee_task_manager.json`
            4.  `pm2 start pm2_fee_app.json`

    2.  testing 分支发布到 10.26.21.16 (部门开发机), 发布命令

        1.  ```bash
            cd /data0/www/htdocs/fee-rd/                            \
            && git checkout -f testing                              \
            && git pull                                             \
            && git merge origin/testing                             \
            && npm install                                          \
            && npm run build                                        \
            && echo "pm2 会自动监控文件变动, 如果没有启动, 请单独执行"  \
            && echo "pm2 restart fee-app --watch=true"              \
            && echo "pm2 restart fee-task-manager --watch=true"     \
            && echo "查看pm2执行情况"                                \
            && pm2 status

            ```

        2.  pm2 配置初始化命令
            1.  `npm i -g pm2`
            2.  `cd /data0/www/htdocs/fee-rd/`
            3.  `pm2 start pm2_fee_task_manager.json`
            4.  `pm2 start pm2_fee_app.json`

    3.  test/线上发布流程
        1.  部门开发机上测试通过后, 从 testing 上向 master 提交 MR, 进行 diff, 确认无误后将代码合并到 master 上并打 tag, 注明发布时间及修改内容
        2.  http://test-arms.fee.example.com 发布流程
            1.  JINKINS 地址
                1.  前端 => http://ci.example.com/job/arms-fee-fe-pre-prod/
                2.  后端 => http://ci.example.com/job/arms-fee-rd-pre-prod/
            2.  执行 Build with Parameters, over
                1.  如果构建后没有自动上传的话, 需要在 build history 中, 点击序号, 进入构建详情, 选择 Promotion Status, 然后强制推送到线上即可
        3.  http://arms.fee.example.com 发布流程
            1.  JINKINS 地址
                1.  前端 => http://ci.example.com/job/arms-fee-fe-prod/
                2.  后端 => http://ci.example.com/job/arms-fee-rd-prod/
            2.  执行 Build with Parameters, over
                1.  如果构建后没有自动上传的话, 需要在 build history 中, 点击序号, 进入构建详情, 选择 Promotion Status, 然后强制推送到线上即可

4)  npm 包依赖

项目基于 express 框架, 相关功能包挑选以[adonis](https://adonisjs.com/docs/4.1)为蓝本, 目前使用以下 npm 依赖

```
dependencies =>

mysql           =>  mysql客户端
ioredis         =>  redis客户端
knex            =>  SQL Query Builder(来自adonisJS)
@adonisjs/ace   =>  命令注册/管理工具(来自adonisJS)
node-schedule   =>  node版crontab, 用于进程调度
log4js          =>  日志记录
lei-stream      =>  流式读取/写入文件. 对node的ReadStream/WriteStream的简单封装
query-string    =>  解析url
ua-parser-js    =>  解析ua
axios           =>  发起http请求
shelljs         =>  执行常见shell命令, 例如, mkdir -p
date-fns@next   =>  替代moment进行日期操作, 目前2.0版本还处于alpha状态, 待正式发布后即可取消@next标记
ini             =>  读取线上环境的ini配置文件
ipip-datx       =>  将ip转换为对应坐标, ipip.net出品

devDependencies =>

node-rdkafka                =>  获取kafka数据, 如果node-kafka无法运行, 考虑本机中是否有librdkafka库 => `sudo apt-get install librdkafka-dev` & 本机是否安装了Python2.7
                            =>  说明: node-rdkafka需要使用gcc进行编译, 但Jinkins上没有相应的编译脚本, 为了能从Jinkins上编译通过, 将`node-rdkfka`放在了dev依赖中.
                            =>  线上发布时, 直接把预编译好的tar文件解压到node_module文件夹里, 跳过gcc编译流程(开发机环境和线上环境一致, 因此使用开发机进行预编译)
                            =>  预编译时需要使用和线上node一致的版本, 目前线上版本是8.6.0
                            =>  打包命令demo => `tar cfv  pre_package.tar.gz node-rdkafka nan bindings`
                            =>  打包完成后使用 `sz node-rdkafka.tar.gz` 即可将文件下载到本机

@babel/*                    =>  7.0系列, 方便脱离对node环境的依赖, 使用js的最新特性
babel-plugin-root-import    =>  解除对相对路径的依赖(项目中通过webpack.config.js(WebStrom) & jsconfig.json(VSCode)辅助编辑器识别路径)
nodemon                     =>  动态启动/载入项目
standard                    =>  JS Standard代码规范
joi                         =>  根据schema校验js值
```

LDAP 登录 => [ldapjs](https://github.com/YMFE/yapi/blob/master/server/utils/ldap.js#L1)

5.  model 编写规范
    1.  按表/功能建立 model
    2.  常量名全部大写, 使用下划线分割
    3.  model
        1.  对外提供以下方法
            1.  getTableName, 允许接收两个参数(只有一个表也可以不传), 返回对应表名, 供其他 model 使用
                1.  projectId
                2.  createAt(记录创建时间戳)
        2.  对内提供以下常量
            1.  BASE_TABLE_NAME
                1.  表名/基础表名
            2.  TABLE_COLUMN
                1.  表内全部字段列表
6.  导入规范
    0.  导入路径均为`~/src/XXXXX`
    1.  使用 `import * as XXX`的方式导入(利用 XXX 作为命名空间, 避免冲突)
    1.  model 文件夹中的模块, 使用 M 作为前缀
    1.  library 文件夹中的模块, 默认直接导入, 如果可能会引起混淆, 则使用 L 作为前缀
7.  routes 规范
    1.  API 地址和 routes 下文件夹路径保持一致, 最底层为 index.js
    2.  通过 import 的方式, 将 API 暴露给外部代码, 最终在`routes/index.js`中, 注册 url

### 日志系统使用方式

```javascript
import * as Logger from '~/src/library/logger'
Logger.log('Entering fee testing')
Logger.info('this is info.')
Logger.warn('this is warn.')
Logger.error('this is error!')
```

# 上线 CheckList

- [ ] 线上环境是否可以正常链接 kafka? (op 是否已安装 librdkafka)
- [ ] log 文件是否可以正常写入?
- [ ] 是否有不必要的 log? 是否有可能会引起磁盘打满的 log?(一条日志一个 log, 会导致磁盘直接打满)
- [ ] kafka autoCommit 默认是打开的，是否关闭，自己控制什么时候提交。

# API 编写 CheckList

- [ ] list 接口无数据时是否返回空列表(而不是空对象)
- [ ] 必要的增删改查(add/udate/detail/list/delete)是否齐备
- [ ] 添加修改接口是否进行了权限校验

# 项目层级结构

```
.
├── bin                             //  项目启动文件, node项目上线后, 通过 bash bin/run.sh 直接启动
│   └── run.sh
├── document                        //  文档目录
│   └── api.md
├── log                             //  本地日志, 线上日志位于 /data0/www/logs/项目网址/  下. 运行时通过配置文件, 根据环境变量获取日志路径
│
├── sql                             //  项目SQL, 字符集编码使用utf8mb4, 以便支持可能的emoji表情
│   └── init.sql
├── public                          //  express的静态资源目录
│   ├── assets
│   ├── libs
│   └── static
├── dist                            //  babel的编译结果目录. 原生node项目存在两个问题: 1.根据node环境不同, 不一定支持最新ES6特性(例如import) 2. 导入模块时, 需要手工计算'..'的深度
│                                   //  因此需要引入babel转义js, 引入babel-plugin-root-import, 支持从根目录导入模块(例如 import * from `~/src/model/base`)
├── jsconfig.json                   //  引入babel-plugin-root-import之后会带来一个新问题: 编辑器无法识别导入路径, 因此需要引入jsconfig.json辅助VSCode识别
├── webpack.config.js               //  引入webpack.config.js辅助WebStrom识别
│
├── src                             //  源代码
│   │  
│   ├── app.js                      //  web框架入口
│   │  
│   ├── fee.js                      //  命令入口, 命令框架基于 @adnoishJS/ace, 使用fee.js统一管理所有命令, 提供了标准代码结构, 参数解析&日志打印功能
│   │  
│   ├── commands                    //  命令目录
│   │   ├── base.js                 //  基础命令
│   │   ├── demo.js                 //  demo命令, 按照规范编写的demo, 包含了所有的命令用法
│   │   ├── parse
│   │   │   ├── base.js             //  子类命令也可以在基类之上再次派生基类
│   │   │   ├── pv.js
│   │   │   └── uv.js
│   │   └── utils
│   │       └── generateSql.js
│   ├── configs                     //  配置文件夹
│   │   ├── env.js                  //  所有配置均依赖env配置, 最后通过export config[env]的方式来按环境导出配置项
│   │   ├── app.js
│   │   └── redis.js
│   ├── library                     //  外部库, 引入时使用 import * as LXXXX 的方式进行引入,在as前加上L前缀, 避免函数重名
│   │   ├── ipip                    //  ipip.net 当前中国准确度最高的ip => 地址转换库, 有各种语言的客户端, 免费版本可以精确到城市
│   │   │   ├── index.js            //  内部可以直接使用 http://ip.matrix.example.com/ip.php?ip=210.12.157.88 进行转换, 这里因为业务特性, 所以使用的是文件数据库
│   │   │   └── ipip.net_20180910.datx  //  文件名中带上更新时间, 方便后续替换
│   │   ├── auth                    //  验证用户身份 parseToken & generateToken
│   │   ├── http                    //  发送网络请求
│   │   ├── kafka                   //  获取kafka日志文件路径
│   │   ├── logger                  //  打印并记录日志
│   │   ├── mysql                   //  连接并操作数据库
│   │   ├── redis                   //  redis客户端
│   │   └── utils                   //  通用工具库
│   │       └── modules
│   │           ├── alart.js        //  公司内部即时消息系统，通知到个人
│   │           ├── database.js     //  数据库有关工具函数
│   │           ├── network.js      //  网络有关工具 & getLocalIpList
│   │           ├── router_config_builder.js //  封装了路由格式
│   │           └── util.js         //  其他工具函数
│   │               ├── sleep       //  睡眠函数
│   │               ├── urlParse    //  解析URL
│   │               ├── ip2Locate   //  解析IP地址对应的国家省份城市
│   │               ├── objectToArray    //  对象转换为数组
│   │               ├── handleEmptyData  //  处理空对象（舍弃对象的空属性）
│   │               └── compare     //  对比对象中指定参数
│   ├── middlewares                 //  express中间件, 可以执行检查登录等通用操作
│   │   └── privilege.js
│   ├── model                       //  M部分, 可以直接操作数据库 按功能/API路径区分文件夹, 按表名命名js文件
│   │   ├── parse                   //  解析指令对应的数据库操作
│   │   │   ├── behavior_distribution.js
│   │   │   ├── city_distribution.js
│   │   │   ├── common.js
│   │   │   ├── duration_distribution.js
│   │   │   ├── monitor.js
│   │   │   ├── monitor_ext.js
│   │   │   ├── project.js
│   │   │   └── uv_record.js
│   │   ├── project                  // 项目相关操作，包括报警，成员，项目添加，用户
│   │   │   ├── alarm
│   │   │   │   └──alarm_config.js
│   │   │   ├── project_member.js
│   │   │   ├── project.js
│   │   │   └── user.js
│   │   └── summary                  // 统计指令对应的数据库操作
│   │       ├── page_view.js
│   │       └── unique_view.js
│   ├── routes                      //  路由/接口
│   │   ├── api                     //  根据接口路径, 创建文件
│   │   │   ├── behavior
│   │   │   │   └── online
│   │   │   │       └── index.js
│   │   │   └── monitor
│   │   │       └── index.js
│   │   └── index.js
│   └── views                       //  express模板, 因为fee已经实现了前后端完全分离, 因此意义不大
│       └── index.ejs
├── README.md                       //  项目说明
├── online.sh                       //  jinkins编译脚本
├── package.json                    //  项目依赖列表
├── .gitattributes                  //  配置换行符, 用于解决Windows(换行为CRLF), Mac/Unix(换行为LF)平台下换行符不一致的问题, 参考 https://github.com/alexkaratarakis/gitattributes
├── .gitignore                      //  项目忽略文件, 参考 https://www.gitignore.io/
└── .babelrc                        //  babel配置

```

# 数据库建表 CheckList

1.  在极端情况下, 数据库单表容量是否绝不会超过一千万条数据
2.  是否有以下字段
    1.  create_time, 记录创建时间, bigint
    2.  update_time, 记录更新时间, bigint
    3.  create_ucid, 记录创建人 ucid, varchar(20) , 可选, 只有当会有人编辑记录时才需要该字段
    4.  update_ucid, 记录更新人 ucid, varchar(20) , 可选, 只有当会有人编辑记录时才需要该字段
3.

# 创建命令 CheckList

1.  类名是否和 signature 保持一致(类名会被作为日志文件名)

# 提交代码 CheckList

1.  检查是否已经删除了用于测试的 console

# 添加接口 CheckList

1.  是否已添加 mock

    1.  标准 mock 配置 =>

    ```json
    {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "object",
      "properties": {
        "code": {
          "type": "number",
          "enum": [0]
        },
        "data": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "url": {
                "type": "string",
                "format": "url"
              },
              "count": {
                "type": "number",
                "minimum": 0,
                "maximum": 100,
                "exclusiveMinimum": true,
                "exclusiveMaximum": true,
                "default": "0",
                "enum": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
              }
            },
            "required": []
          }
        },
        "msg": {
          "type": "string",
          "enum": ["", ""]
        },
        "action": {
          "type": "string",
          "enum": ["success"]
        },
        "url": {
          "type": "string",
          "enum": [""]
        }
      },
      "required": []
    }
    ```

# 系统接入流程

1.  接收邮件, 确认项目日 pv, 项目名, pid, 负责人信息. 对于日 pv 大于 10w 的系统, 需要进行抽样打点, 保证每日入库日志数不高于 10w/日
2.  更新 generateSQL 命令, 依次是 id, 抽样比率, 项目名(展示), 项目 id, 负责人信息, 其他数据和之前 SQL 保持一致即可
    demo =>

    ```SQL
    REPLACE INTO \`t_o_project\` (\`id\`, \`rate\`, \`display_name\`, \`project_name\`, \`c_desc\`, \`is_delete\`, \`create_ucid\`, \`update_ucid\`, \`create_time\`, \`update_time\`) VALUES (13, 100, '社区生活管理平台', 'life_manage', '负责人:徐彪', 0, '', '', 0, 0);

    ```

3.  生成 SQL 命令, 例如

    模板 =>

    ```bash
    npm run build; node dist/fee Utils:GenerateSQL ${项目id, 多个id逗号分隔} ${开始时间, YYYY-MM格式}  ${结束时间, YYYY-MM格式} > init.sql; echo "SQL生成完毕"
    ```

    实际命令 =>

    ```bash
    npm run build ; node dist/fee Utils:GenerateSQL 13,14,15 '2018-10' '2019-12' > init.sql ; echo "SQL生成完毕"
    ```

4.  在 dev 数据库执行生成的 SQL
5.  dev 数据执行完毕, 确认无误后, 在线上数据库执行生成的 SQL
6.  登陆, 切换到新项目, 将业务方负责人添加为项目 owner(需要先确保自己是 admin, 切换用户角色需要先在 t_o_user 中将自己数据记录的 role 从 dev 改为 admin)
7.  sdk 接入地址
8.  告知业务方 pid & 线上项目地址
    1.  邮件通知
    2.  企微通知
9.  对接完成
10. 报警 push 企微消息

# 同类项目

1.  功能相近
    1.  [阿里云:业务实时监控服务](https://arms.console.aliyun.com)
    2.  [Fun Debug](https://fundebug.com)
    3.  [Rollbar](https://rollbar.com)(sdk 已开源)
