const gulp = require('gulp')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const tagReplace = require('gulp-tag-content-replace')
const fs = require('fs')
const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version

function browser (cb) {
  gulp.src('./VueInterval.js')
    .pipe(replace(/(@@version@@)+/, version))
    .pipe(replace('/* ModuleDef */', ''))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rename('VueInterval.min.js'))
    .pipe(gulp.dest('./dist/'))
  cb()
}

function umd (cb) {
  gulp.src('./VueInterval.js')
    .pipe(replace(/(@@version@@)+/, version))
    .pipe(tagReplace('/* ModuleDef */', "import Vue from 'vue';\nexport default"))
    .pipe(rename('VueInterval.common.js'))
    .pipe(gulp.dest('./dist/'))
  cb()
}

exports.browser = browser
exports.umd = umd
exports.default = gulp.parallel(browser, umd)
