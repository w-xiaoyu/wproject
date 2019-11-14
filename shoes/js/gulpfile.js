let gulp = require("gulp");
let connect = require("gulp-connect");
let concat = require("gulp-concat");
let uglify = require("gulp-uglify");
let rename = require("gulp-rename");
let babel = require("gulp-babel");
let proxy = require("http-proxy-middleware");
let sass = require("gulp-sass");

// 开启监听，监听文件，发生保存时，自动执行指定命令
gulp.task("listen",()=>{
    gulp.watch("../sass/*.scss",["sass"]);
})

// gulp的插件
// 服务器插件：gulp-connect
// 命令提示框中输入：npm install gulp-connect
// 引入之后才能使用

gulp.task("server",()=>{
    connect.server({
        root:"server",     //以哪个文件夹为服务器的根目录
        port:83,           //端口号
        livereload:true,    //是否可以自动刷新
        middleware: function(connect, opt) {
            return [
                proxy('/api',  {
                    target: 'https://api.douban.com/v2/',    //代理的目标地址
                    changeOrigin:true,
                    pathRewrite:{    //路径重写规则
                        '^/api':''
                    }
                })
            ]
        }
    })
})

// 批处理指令，批处理了监听和服务器
gulp.task("pichuli",["server","listen"]);


// js文件合并压缩改名
gulp.task('scripts',()=>{
    gulp.src(['src/js/a.js','src/js/b.js'])
        .pipe(concat('index.js'))
        // ES6转ES5
        .pipe(babel())
        .pipe(gulp.dest('server/js'))
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('server/js'));
})

// sass转css的命令
gulp.task("sass",()=>{
    gulp.src("../sass/*.scss")
        .pipe(sass().on("error",sass.logError))
        .pipe(gulp.dest("../css"))
})



