# 指令说明


安装依赖包：
`npm install`

mock api
在`data\apimap.js`里面，设置相应的mock api地址，并且创建相应的json文件

开发：
`gulp dev-less`
* css文件统一放在style下面的main.less中，通过@import来引入相应的less文件
* js文件统一放在项目根路径下的index.js中，通过@import来引入相应的js文件

发布前
`gulp jshint` --进行代码的检验

发布：
`gulp publish` --(生产环境)自动添加css跨浏览器前缀，自动进行css压缩，js压缩
`gulp publish-test` --(测试环境)自动添加css跨浏览器前缀，自动进行css压缩，js压缩

单独打包雪碧图
`gulp sprite`

# 说明如下
* 'src'目录为源文件目录 'dist'为编译后的文件目录
* 雪碧图的css文件为'src/css/sprite.css', 相应的图片放在在'src/images/sprite'目录下。注意，1x、2x和3x必须大小严格成比例。
* 在开发阶段，项目会自动编译并刷新浏览器。
* 发布程序后，会自动生成'dist.zip'包
