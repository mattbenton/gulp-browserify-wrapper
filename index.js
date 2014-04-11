var browserify = require('browserify');
var gutil      = require('gulp-util');
var through    = require('through2');

function combine () {
  return through.obj(function ( file, enc, callback ) {
    var that = this;

    // Create a new browserify instance for the entry file.
    var b = browserify([file.path]);

    b.bundle({}, function ( err, src ) {
      if ( err ) {
        // Something went wrong, most likely that a required file is missing.
        gutil.log(gutil.colors.red('[browserify]'), err.message);
        callback(err);
      } else {
        // Replace contents of stream with combined source.
        file.contents = new Buffer(src);
        that.push(file);
        callback();
      }
    });

  });
}

module.export = combine;
