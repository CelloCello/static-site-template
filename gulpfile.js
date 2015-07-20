var gulp = require('gulp');
// var sass = require('gulp-sass');
// var minifyCss = require('gulp-minify-css');
// var rename = require('gulp-rename');
var compass = require('gulp-compass');
// var jshint = require('gulp-jshint');
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
var connect = require('gulp-connect');
var mainBowerFiles = require('main-bower-files');
var nunjucks = require('gulp-nunjucks-render');

var paths = {
  dist: './dist',
  html: './src/*.html',
  scss: './src/scss/*.scss',
  sass: ['./scss/**/*.scss']
};

// gulp.task('default', ['sass', 'scripts']);

gulp.task('default', ['server', 'build', 'watch']);

gulp.task('build', ['html', 'compass', 'bower-main']);

gulp.task('compass', function() {
  gulp.src('./src/sass/*.scss')
    .pipe(compass({
      config_file: './src/sass/config.rb',
      css: './dist/css',
      sass: './src/sass'
    }))
    .pipe(gulp.dest(paths.dist+'/css'))
    .pipe(connect.reload());
});

gulp.task('bower-main', function() {
    gulp.src(mainBowerFiles())
      .pipe(gulp.dest('./dist/lib'));
});

// gulp.task('nunjucks', function () {
//     gulp.src('./src/*.html')
//       .pipe(nunjucks())
//       .pipe(gulp.dest('./dist'));
// });

// gulp.task('sass', function(done) {
//   gulp.src('./src/scss/*.scss')
//     .pipe(sass())
//     .pipe(gulp.dest('./css/'))
//     .pipe(minifyCss({
//       keepSpecialComments: 0
//     }))
//     .pipe(rename({ extname: '.min.css' }))
//     .pipe(gulp.dest('./css/'))
//     .on('end', done);
// });

// gulp.task('scripts', function() {  
//   return gulp.src('src/js/**/*.js')
//   	.pipe(jshint())
//     //.pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('./js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify({compress:false}))
//     .pipe(gulp.dest('./js'))
//     //.pipe(notify({ message: 'Scripts task complete' }));
// });

gulp.task('server', function() {
  connect.server({
    root: paths.dist,
    livereload: true
  });
});

gulp.task('html', function () {
  nunjucks.nunjucks.configure(['src/']);
  gulp.src([paths.html, '!src/_*.html'])
    .pipe(nunjucks())
    .pipe(gulp.dest(paths.dist))
    .pipe(connect.reload());
});

// gulp.task('watch', function() {
//   gulp.watch(paths.sass, ['sass']);
// });

gulp.task('watch', function () {
  gulp.watch(paths.html, ['html']);
  gulp.watch('./src/sass/*', ['compass']);
});

