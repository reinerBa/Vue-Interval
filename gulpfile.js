var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var tagReplace = require('gulp-tag-content-replace');
var fs = require('fs')
var version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version

gulp.task('default',function(){
	gulp.src('./VueInterval.js')
		.pipe(replace(/(@@version@@)+/, version))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify({preserveComments: 'license'}))
		.pipe(rename('VueInterval.min.js'))
		.pipe(gulp.dest('./dist/'));
		
	gulp.src('./VueInterval.js')
		.pipe(replace(/(@@version@@)+/, version))		
		.pipe(tagReplace("/*ModuleDef*/", "import Vue from 'Vue'; export default"))
		.pipe(rename('VueInterval.common.js'))
		.pipe(gulp.dest('./dist/'));
});
