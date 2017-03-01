var gulp       	= require('gulp'),
    server      = require('gulp-develop-server'),
    plumber     = require('gulp-plumber'),
    fs          = require('fs'),
    browserify  = require("browserify")

gulp.task('scripts', function () {
    browserify('./reactClient/dashboard.js')
      .transform("babelify", {presets: ["es2015", "react"]})
      .bundle()
      .pipe(fs.createWriteStream("./public/dashboard.js"));
});

gulp.task( 'server:start', ['scripts'], function() {
    server.listen( { path: './index.js' }, function(err){
    });
});
 
gulp.task( 'server:restart', ['scripts'], function() {
    server.restart(function(err){
        if (err) {
            console.log(err)
        }
    })
});

gulp.task( 'default', [ 'server:start' ], function() {
    gulp.watch( ['./reactClient/**/**/**/*.jsx', './reactClient/**/**/**/*.js', 'views/**/*.handlebars' ], [ 'server:restart' ] )
});