var gulp = require('gulp');

//创建一个默认任务 default
//gulp 命令会执行这个默认任务
//gulp <task> <othertask> 会执行特定的任务
gulp.task('default', function() {
	console.log('hi,this world');
});

//gulp.src(globs[, options])
gulp.src(['1.js', '2.js']).pipe(gulp.dest('./build'));