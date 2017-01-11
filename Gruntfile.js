// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // configure nodemon
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    // configure modernizr
    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "./bin/modernizr.js",
        "tests": [
          "touchevents"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },

    // annotate angular files
    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      app: {
        files: [{
          expand: true,
          src: 'public/src/js/*.js',
          dest: 'dist'
        },
        {
          expand: true,
          src: 'public/src/js/*/**.js',
          dest: 'dist'
        }]
      }
    },

    // uglify
    uglify: {
      my_target: {
        options: {
          beautify: true
        },
        files: [{
          src: '*/**.js',
          dest: 'dist/js',
          cwd: 'dist/public/src/js',
          expand: true,
          ext: '.min.js',
        },
        {
          src: '*.js',
          dest: 'dist/js',
          cwd: 'dist/public/src/js',
          expand: true,
          ext: '.min.js'
        }]
      }
    },

    // remove annotated angular files
    clean: {
      files: {
        src: ['dist/public']
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['ngAnnotate', 'uglify', 'modernizr:dist', 'clean', 'nodemon']); 

};