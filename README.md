# 基于gulp+angular的脚手架工具

## 开始安装
首选确保已经安装Node.js

## 安装yeoman
```
npm install -g yo
```

## 安装脚手架
```
npm install -g generator-alchemy-woo
```

## 在自己的空项目中运行
```
yo alchemy-woo
```

## 然后在项目中安装node_modules和gulp
```
npm install
npm install gulp -g
```

## 运行gulp-help 查看各类指令
```
gulp help
```

注意：
架手架目前已经实现的功能
* 根据需要引入自己的css和js依赖
* 自动将小的icon转成base64编码
* 配套前端的mock服务器，让前端开发脱离后端
* 自动压缩js,css，编译Less,自动添加css前缀，自动增加静态资源的版本号
* 开发热更新，浏览器实时刷新显示
* js代码进行js hint语法检查。
