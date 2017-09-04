/**
 * gulp 的配置文件
 * @src 每个任务的文件导入地址
 * @dist 每个任务最终的打包地址
 */
var _BASE_SRC = 'src';
module.exports = {
  // 项目的启动地址
  LOADER_PATH: '/index.html',

  //路由主页
  HOME: "#!/home",

  // css的配置文件
  CSS: {
    SRC: [_BASE_SRC + '/style/*.css'],
    WATCH_SRC: [_BASE_SRC + '/style/**/*.css'],
    DEST: 'dist/css',
    MAX_IMG_SIZE: 5 * 1024
  },

  // less的配置文件
  LESS: {
    SRC: [_BASE_SRC + '/style/*.less'],
    WATCH_SRC: [_BASE_SRC + '/style/**/*.less'],
    DEST: 'dist/css',
    MAX_IMG_SIZE: 5 * 1024   //最大的图片配置文件
  },

  JS: {
    DEST: 'dist/js',
    SRCDEV: ['index.js'],   //本地开发的js地址
    SRCPUBLISH: ['index.publish.js'],  // 发布版本的js地址
  },

  HTML: {
    SRC: [_BASE_SRC + '/views/*.html'],
    DEST: 'dist/views'
  },

  LIB: {
    SRC: [
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-animate/angular-animate.min.js',
      'bower_components/angular-touch/angular-touch.min.js',
      'bower_components/chart.js/dist/Chart.min.js',
      _BASE_SRC + '/public/js/sun.js'
    ],
    DEST: 'dist/js'
  },

  IMG: { //图片
    SRC: [_BASE_SRC + '/images/**/*', '!' + _BASE_SRC + '/images/sprite/*'],
    DEST: 'dist/images'
  },

  PUBLIC: { //公共文件，包括公共的js库,css样式
    SRC: [_BASE_SRC + '/public/**/*'],
    DEST: 'dist/public'
  },

  INDEX: { // 单页应用的index.html app.js文件
    SRC: [_BASE_SRC + '/*.*'],
    DEST: 'dist/'
  },

  SPRITE: { // 雪碧图
    SRC: _BASE_SRC + '/style/sprite.css',
    SLICEPATH: '../images/sprite',
    PICDEST: 'dist/images/sprite',
    CSSDEST: 'src/css/vendor'
  },

  BASE64: {
    SRC: [_BASE_SRC + '/style/main.css'],
    MAX_IMG_SIZE: 10 * 1024,
    DEST: 'dist/css/'
  },

  HOST: { // 服务器参数
    PATH: 'dist/',
    PORT: 3000,
    HTML: 'index.html'
  },

  ZIP: {     //打包文件
    SRC: 'dist/**/*.*',
    ZIP_NAME: 'wf.zip',
    DEST: '../zip/'
  },
  CLEAN: {        //清理目录文件
    SRC: ['dist/*']
  }

};
