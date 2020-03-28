#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 暂存所有未提交的变更
git stash

# 获取master分支上最近一次commit message
git checkout master
message=$(git log -1 --pretty=format:'%s')
# message=$(git log -1 --date=iso --pretty=format:'{"commit": "%h","author": "%aN <%aE>","date": "%ad","message": "%s"}')
echo $message

# 生成静态文件
# yarn docs:build

# 进入生成的文件夹
cd ./dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "${message}"

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:aa978563552/aa978563552.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:alphawq/FEE-doc.git master:gh-pages

cd -

git stash pop