const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const reload = browserSync.reload;
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;

gulp.task('sass-compile', ()=>{
  return gulp.src('./public/scss/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(csso())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/css/'))
})

gulp.task('nodemon', (cb)=>{
  var started = false;
  return nodemon({
    script: 'server.js',
    ext: 'js ejs css',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  }).on('start', ()=>{
    if(!started){
      started = true;
      cb();      
    }
  }).on('restart', ()=>{
    setTimeout(()=>{
      reload({
        stream: false
      })
    }, 500)
  })
})

gulp.task('browser-sync', ['nodemon'], ()=>{
  browserSync({
    proxy: "localhost:"+port,
    port: 5000,
    notify: true
  });
});

gulp.task('watch', ()=>{
  gulp.watch(['./views/*.ejs'], reload)
  gulp.watch(['./public/scss/*.scss'], ['sass-compile', reload])
});

gulp.task('default', ['sass-compile', 'browser-sync', 'watch']);