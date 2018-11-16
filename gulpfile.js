var gulp=require('gulp');
var sass=require('gulp-sass');
var server=require('gulp-webserver');

//sass-->css
gulp.task('devSass',function(){
	return gulp.src('./src/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./src/css'))
})
//监听
gulp.task('buildSass',function(){
	return gulp.watch('./src/scss/*.scss',gulp.series('devSass'))
})
//起服务
gulp.task('server',function(){
	return gulp.src('src')
		.pipe(server({
			port:8080,
			proxies:[]
		}))
})

//开发环境
gulp.task('dev',gulp.series('devSass','server','buildSass'));