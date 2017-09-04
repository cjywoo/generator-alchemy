/**
 Gulpfile for front-end-project
 made by Junwoo.
*/

var gulp = require('gulp'),
  os = require('os'),
  gutil = require('gulp-util'),
  less = require('gulp-less'),
  concat = require('gulp-concat'),
  gulpOpen = require('gulp-open'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin'),
  md5 = require('gulp-md5-plus'),
  fileinclude = require('gulp-file-include'),
  clean = require('gulp-clean'),
  spriter = require('gulp-css-spriter'),
  cssimport = require("gulp-cssimport"),
  postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  deletefile = require('gulp-delete-file'),
  zip = require('gulp-zip'), // 用于zip打包
  connect = require('gulp-connect'),
  runSequence = require('run-sequence'),
  gulpif = require('gulp-if'),
  watch = require('gulp-watch'),
  autoprefixer = require('gulp-autoprefixer'),
  jshint = require('gulp-jshint'),
  browserSync = require('browser-sync').create(),
  webserver = require('gulp-webserver'),
  tmtsprite = require('gulp-tmtsprite'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  base64 = require('gulp-base64'), // 图片转 base64
  plumber = require('gulp-plumber'), // 错误监听
  url = require('url'), // 用于url 解析的
  replace = require('gulp-replace'),
  rev = require('gulp-rev'), //用于添加静态资源版本号
  jsImport = require('gulp-js-import'),
  rename = require('gulp-rename'),
  rev = require('gulp-rev-append');

//----------config-------------------------------
// mockserver
var mockApi = require('./mockApi');
//打开默认的浏览器
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
    os.platform() === 'win32' ? 'chrome' : 'firefox'));

var _CONFIG = require('./gulp.config.js');
//---------------task-----------------------------

//将图片拷贝到目标目录
gulp.task('copy:images', function(done) {
  gulp.src(_CONFIG.IMG.SRC)
    .pipe(plumber())
    .pipe(gulp.dest(_CONFIG.IMG.DEST))
    .on('end', done);
});

//将公共目录文件拷贝
gulp.task('copy:public', function(done) {
  gulp.src(_CONFIG.PUBLIC.SRC)
    .pipe(plumber())
    .pipe(gulp.dest(_CONFIG.PUBLIC.DEST))
    .on('end', done);
});

//拷贝index文件
gulp.task('copy:index', function(done) {
  gulp.src(_CONFIG.INDEX.SRC)
    .pipe(plumber())
    .pipe(gulp.dest(_CONFIG.INDEX.DEST))
    .on('end', done);
});

//将css文件拷贝
gulp.task('copy:css', function(done) {
  gulp.src(_CONFIG.CSS.SRC)
    .pipe(plumber())
    .pipe(cssimport()) //支持css import
    .pipe(postcss([require('precss')]))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 3.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: _CONFIG.CSS.MAX_IMG_SIZE
    }))
    .pipe(gulp.dest(_CONFIG.CSS.DEST))
    .on('end', done);
});

//压缩合并css
gulp.task('cssmin', function(done) {
  gulp.src(_CONFIG.CSS.SRC)
    .pipe(plumber())
    .pipe(cssimport()) //支持css import
    .pipe(postcss([require('precss')])) //增加多浏览器兼容前缀
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 3.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: _CONFIG.CSS.MAX_IMG_SIZE
    }))
    .pipe(cssmin()) //css压缩
    .pipe(gulp.dest(_CONFIG.CSS.DEST))
    .on('end', done);
});

// 拷贝less文件
gulp.task('copy:less', function(done) {
  gulp.src(_CONFIG.LESS.SRC)
    .pipe(plumber())
    .pipe(cssimport()) //支持css import
    .pipe(less()) //支持css import
    .pipe(postcss([require('precss')])) //增加多浏览器兼容前缀
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 3.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: _CONFIG.LESS.MAX_IMG_SIZE
    }))
    .pipe(gulp.dest(_CONFIG.LESS.DEST))
    .on('end', done);
});

// less文件压缩
gulp.task('lessmin', function(done) {
  gulp.src(_CONFIG.LESS.SRC)
    .pipe(plumber())
    .pipe(cssimport()) //支持css import
    .pipe(less()) //支持css import
    .pipe(postcss([require('precss')])) //增加多浏览器兼容前缀
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 3.0'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: _CONFIG.LESS.MAX_IMG_SIZE
    }))
    .pipe(cssmin()) //css压缩
    .pipe(gulp.dest(_CONFIG.LESS.DEST))
    .on('end', done);
});


//将js文件拷贝
gulp.task('copy:js', function(done) {
  gulp.src(_CONFIG.JS.SRCDEV)
    .pipe(plumber())
    .pipe(jsImport())
    .pipe(replace('https://web.zj.icbc.com.cn/', 'http://myipad.dccnet.com.cn/'))
    .pipe(replace('dict.env = \'2\'', 'dict.env = \'1\''))
    .pipe(gulp.dest(_CONFIG.JS.DEST))
    .on('end', done);
});

//发布生产版本js
gulp.task('jsmin', function(done) {
  gulp.src(_CONFIG.JS.SRCPUBLISH)
    .pipe(plumber())
    .pipe(jsImport())
    .pipe(uglify({
      mangle: false //排除混淆关键字
    }))
    .pipe(gulp.dest(_CONFIG.JS.DEST))
    .on('end', done);
});

//发布测试环境版本js
gulp.task('jsmin-test', function(done) {
  gulp.src(_CONFIG.JS.SRCPUBLISH)
    .pipe(plumber())
    .pipe(jsImport())
    .pipe(replace('https://web.zj.icbc.com.cn/', 'http://myipad.dccnet.com.cn/'))
    .pipe(uglify({
      mangle: false //排除混淆关键字
    }))
    .pipe(gulp.dest(_CONFIG.JS.DEST))
    .on('end', done);
});

// js 生成投产版本的js index.dev.js
gulp.task('create-indexjs', function() {
  gulp.src('index.js') //多个文件以数组形式传入
    .pipe(replace("@import './src/js/cookie.js'", ''))
    .pipe(rename({
      suffix: '.publish'
    }))
    .pipe(gulp.dest('./'));
});

// 雪碧图
gulp.task('sprite', function(done) {
  return gulp.src(_CONFIG.SPRITE.SRC)
    .pipe(plumber())
    .pipe(tmtsprite({
      slicePath: _CONFIG.SPRITE.SLICEPATH
    }))
    .pipe(gulpif('*.png', gulp.dest(_CONFIG.SPRITE.PICDEST), gulp.dest(_CONFIG.SPRITE.CSSDEST)));
});

// 将css中转为base64
gulp.task('base64', function() {
  return gulp.src(_CONFIG.BASE64.SRC)
    .pipe(plumber())
    .pipe(base64({
      extensions: ['png'],
      maxImageSize: _CONFIG.BASE64.MAX_IMG_SIZE
    }))
    .pipe(gulp.dest(_CONFIG.BASE64.DEST));
});

//用于在html文件中直接include文件
gulp.task('html', function(done) {
  gulp.src(_CONFIG.HTML.SRC)
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(_CONFIG.HTML.DEST))
    .on('end', done);
  // .pipe(connect.reload())
});


//gulp服务器
gulp.task('connect', function() {
  console.log('connect------------');
  connect.server({
    root: _CONFIG.HOST.PATH,
    port: _CONFIG.HOST.PORT,
    livereload: true
  });
});

//browser--有问题
gulp.task('serve', function() {
  //初始化项目跟目录为'./'（也可以使用代理proxy: "yourlocal.dev"）
  browserSync.init({
    server: 'dist/app'
  });
});

// 前端自己的mock
gulp.task('webserver', function() {
  gulp.src('./market')
    .pipe(plumber())
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'market'
      },
      port: 8000,
      // 这里是关键！
      middleware: function(req, res, next) {
        var urlObj = url.parse(req.url, true),
          method = req.method,
          paramObj = urlObj.query;
        // mock数据
        mockApi(res, urlObj.pathname, paramObj, next);
      }
    }));
});


//gulp用浏览器自动打开当前工程
gulp.task('open', function(done) {
  gulp.src('')
    .pipe(plumber())
    .pipe(gulpOpen({
      app: browser,
      uri: 'http://localhost:3000' + _CONFIG.LOADER_PATH + _CONFIG.HOME
    }))
    .on('end', done);
});

// 同步屏
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: 'http://localhost:3000' + _CONFIG.LOADER_PATH
  });
});

//gulp 打包文件
gulp.task('zip_new', function(done) {
  gulp.src(_CONFIG.ZIP.SRC)
    .pipe(plumber())
    .pipe(zip(_CONFIG.ZIP.ZIP_NAME))
    .pipe(gulp.dest(_CONFIG.ZIP.DEST))
    .on('end', done);
});

//gulp清空dist目录
gulp.task('clean', function(done) {
  return gulp.src(_CONFIG.CLEAN.SRC)
    .pipe(plumber())
    .pipe(clean());
});

//gulp自动刷新浏览器
gulp.task('reload', function() {
  gulp.src('dist' + _CONFIG.LOADER_PATH)
    .pipe(plumber())
    .pipe(connect.reload())
    .on('error', swallowError);
});

//gulp 代码检查
gulp.task('jshint', function() {
  gulp.src(_CONFIG.JS.SRC)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lib', function() {
  gulp.src(_CONFIG.LIB.SRC)
    .pipe(gulp.dest(_CONFIG.LIB.DEST));
});


//Html更换css、js文件版本
gulp.task('revHtml', function() {
  return gulp.src('dist/index.html') /*WEB-INF/views是本地html文件的路径，可自行配置*/
    .pipe(rev())
    .pipe(gulp.dest('dist')); /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
});

// 错误监听函数
function swallowError(error) {
  // If you want details of the error in the console
  console.error(error.toString());

  this.emit('end');
}

//gulp监听
gulp.task('watch', function() {
  gulp.watch(_CONFIG.CSS.SRC, ['copy:css']);
  gulp.watch(_CONFIG.JS.SRC, ['copy:js', 'jshint']);
  gulp.watch(_CONFIG.IMG.SRC, ['copy:images']);
  gulp.watch(_CONFIG.INDEX.SRC, ['copy:index']);
  gulp.watch(_CONFIG.PUBLIC.SRC, ['copy:public']);
  gulp.watch(_CONFIG.HTML.SRC, ['html']);
  gulp.watch(_CONFIG.SPRITE.SRC, ['sprite']);
  gulp.watch('dist/**/*', ['reload']);
});

gulp.task('watch-less', function() {
  gulp.watch(_CONFIG.LESS.WATCH_SRC, ['copy:less']);
  gulp.watch(_CONFIG.JS.SRC, ['copy:js', 'jshint']);
  gulp.watch(_CONFIG.IMG.SRC, ['copy:images']);
  gulp.watch(_CONFIG.INDEX.SRC, ['copy:index']);
  gulp.watch(_CONFIG.PUBLIC.SRC, ['copy:public']);
  gulp.watch(_CONFIG.HTML.SRC, ['html']);
  gulp.watch('dist/**/*', ['reload']);
});


// ---------------------sequence task---------------------------------
gulp.task('help', function() {

  console.log('	gulp publish			生产版本文件发布');

  console.log('	gulp publish-test			测试环境版本文件发布');

  console.log('	gulp watch			文件监控');

  console.log('	gulp help			gulp参数说明');

  console.log('	gulp dev			构建开发环境');

  console.log('	gulp sprite			生成雪碧图');

});


gulp.task('copy:file', ['copy:images', 'copy:public', 'copy:css', 'copy:js', 'copy:index', 'lib']);
gulp.task('copy:file-less', ['copy:images', 'copy:public', 'copy:less', 'copy:js', 'copy:index', 'lib']);

//打包生产版本
gulp.task('publish', function(callback) {
  runSequence('clean', 'create-indexjs', ['html', 'copy:images', 'copy:public', 'lessmin', 'jsmin', 'copy:index', 'lib'], 'revHtml', 'zip_new', callback);
});

// 打包测试环境版本
gulp.task('publish-test', function(callback) {
  runSequence('clean', 'create-indexjs', ['html', 'copy:images', 'copy:public', 'lessmin', 'jsmin-test', 'copy:index', 'lib'], 'revHtml', 'zip_new', callback);
});

// 开发命令
gulp.task('dev-sync', function(callback) {
  runSequence('clean', ['html', 'copy:file'], ['watch', 'webserver', 'connect', 'browser-sync', 'open'], callback);
});

gulp.task('dev', function(callback) {
  runSequence('clean', ['html', 'copy:file'], ['watch', 'webserver', 'connect', 'open'], callback);
});
gulp.task('dev-less', function(callback) {
  runSequence('clean', ['html', 'copy:file-less'], 'revHtml', ['watch-less', 'webserver', 'connect', 'open'], callback);
});
