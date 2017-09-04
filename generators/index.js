var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
module.exports = generators.Base.extend({
    initializing: function () {    //初始化准备工作
    },

    prompting: function () {  //接受用户输入
        var done = this.async(); //当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法

        //yeoman-generator 模块提供了很多内置的方法供我们调用，如下面的this.log , this.prompt , this.template , this.spawncommand 等

        // Have Yeoman greet the user.
        this.log(yosay('Welcome to the wootic\'s ' + chalk.red('alchemy') + ' generator!'
        ));
        this.name = path.basename(process.cwd());
        this.license = 'ISC';
        this.description = '';
        this.author = '';
        var prompts = [
            {
                type: 'input',
                name: 'name',
                message: 'name of app:', default: this.name
            },
            {
                type: 'input',
                name: 'description',
                message: 'description:', default: this.description
            },
            {
                type: 'list',   // 提供选择的列表
                name: 'angular',
                message: 'which version of angular',
                choices: [
                    {
                        name: 'angular@1.x',
                        value: '1.4.x'
                    },
                    {
                        name: 'angular@2.x',
                        value: '6.0.x'
                    }
                ]
            },
            {
                type: 'input',
                name: 'license',
                message: 'license:', default: this.license
            },
            {
                type: 'input',
                name: 'author',
                message: 'author:', default: this.author
            }

        ];
        this.prompt(prompts, function (props) {
            this.name = props.name;
            this.pkgName = props.name;
            this.angular = props.angular;
            this.license = props.license;
            this.author = props.author;
            this.description = props.description;

            done();  //进入下一个生命周期阶段
        }.bind(this));
    },

    generateBasic: function() {  //按照自己的templates目录自定义
        this.directory('src', 'src');    //拷贝目录
        this.directory('data', 'data');
        this.copy('package.json', 'package.json');   //拷贝文件
        this.copy('index.html', 'index.html');
        this.copy('README.md', 'README.md');
        this.copy('gulp.config.js', 'gulp.config.js');
        this.copy('gulpfile.js', 'gulpfile.js');
    },
    generateClient: function() {
        this.sourceRoot(path.join(__dirname, 'templates'));
        this.destinationPath('./');
    },
    // install: function () {
    //     var done = this.async();
    //     this.spawnCommand('npm', ['install'])  //安装项目依赖
    //         .on('exit', function (code) {
    //             if (code) {
    //                 done(new Error('code:' + code));
    //             } else {
    //                 done();
    //             }
    //         })
    //         .on('error', done);
    // },
    end: function () {
        var done = this.async();
        this.spawnCommand('gulp')   //生成器退出前运行gulp，开启watch任务
            .on('exit', function (code) {
                if (code) {
                    done(new Error('code:' + code));
                } else {
                    done();
                }
            })
            .on('error', done);
    }
});
