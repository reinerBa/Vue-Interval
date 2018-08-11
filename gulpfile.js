var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var tagReplace = require('gulp-tag-content-replace');
var fs = require('fs')
var version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version


function browser(cb){
  return gulp.src('./VueInterval.js')
		.pipe(replace(/(@@version@@)+/, version))
		.pipe(replace("/*ModuleDef*/", ""))
		.pipe(gulp.dest('./dist/'))
		.pipe(uglify({preserveComments: 'license'}))
		.pipe(rename('VueInterval.min.js'))
		.pipe(gulp.dest('./dist/'));
}

function umd(cb){
  return gulp.src('./VueInterval.js')
		.pipe(replace(/(@@version@@)+/, version))		
		.pipe(tagReplace("/*ModuleDef*/", "import Vue from 'vue';\nexport default"))
		.pipe(rename('VueInterval.common.js'))
		.pipe(gulp.dest('./dist/'));
}

exports.browser = browser
exports.umd = umd
exports.default = gulp.parallel(browser, umd)