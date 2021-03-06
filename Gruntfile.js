// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

    // nodemon
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

    // jshint
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      build: ['Grunfile.js', 'public/src/js/*.js', 'public/src/js/*/**.js']
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

    // cssmin
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public/src/css',
          src: ['*.css'],
          dest: 'dist/css',
          ext: '.min.css'
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
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['jshint', 'ngAnnotate', 'uglify', 'modernizr:dist', 'cssmin','clean']);
};
