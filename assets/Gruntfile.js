/* global module:false, require:true, __dirname:true */
var fs = require('fs');
var path = require('path');

module.exports = function (grunt) {
  var fs = require('fs');
  var path = require('path');
  var util = require('util');
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      folder: 'dist',
      port: 8888,
      livereload: 35740
    },

    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    // '<%= grunt.template.today("yyyy-mm-dd HH:MM:dd") %>\n' +
    '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    clean: {
      dev: ['<%= config.folder %>']
    },

    imagemin: { // Task
      dynamic: { // Another target
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: 'src/images', // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif,ico,bmp}'], // Actual patterns to match
          dest: 'src/images' // Destination path prefix
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      dev: 'src/js/*.js'
    },

    concat: {
      options: {
        stripBanners: true
      },
      css: {
        src: ['src/css/base.css', 'src/css/icons.css'],
        dest: '<%= config.folder %>/css/base.css'
      },
      js: {
        files: [{
          src: ['vendor/polyfill/**/*.js', 'vendor/zepto.js', 'vendor/fastclick.js', 'vendor/swig.js', 'vendor/swipe.js', 'vendor/bridge.js', 'vendor/base.js', 'vendor/widget/**/*.js'],
          dest: '<%= config.folder %>/vendor/base.js'
        }]
      }
    },

    cssmin: {
      dev: {
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: '<%= config.folder %>/css', // Src matches are relative to this path
          src: ['**/*.css'], // Actual patterns to match
          dest: '<%= config.folder %>/css' // Destination path prefix
        }]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        enclose: {}
      },
      js: {
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: '<%= config.folder %>/js', // Src matches are relative to this path
          src: ['**/*.js', '!**/game.js'], // Actual patterns to match
          dest: '<%= config.folder %>/js' // Destination path prefix
        },{
          src: ['<%= config.folder %>/vendor/base.js'],
          dest: '<%= config.folder %>/vendor/base.js'
        }]
      }
    },

    px2rem: {
      options: {
        root: 32.8125
      },
      css: {
        files: [{
          expand: true, // Enable dynamic expansion
          cwd: '<%= config.folder %>/css', // Src matches are relative to this path
          src: ['**/*.css', '!doodle.css'], // Actual patterns to match
          dest: '<%= config.folder %>/css' // Destination path prefix
        }]
      }
    },

    watch: {
      options: {
        livereload: '<%= config.livereload%>'
      },
      src: {
        files: ['src/**/*.{html,css,js,ico,png,txt,gif,jpg,jpeg,svg,eot,ttf,woff,json}'],
        tasks: ['sync:src2dest']
      },
      vendor: {
        files: ['vendor/lib/**/*.js'],
        tasks: ['sync:vendor']
      },
      js: {
        files: ['vendor/**/*.js', '!vendor/lib/**/*.js'],
        tasks: ['concat:js']
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['px2rem']
      },
      combine: {
        files: ['src/css/base.css', 'src/css/icons.css'],
        tasks: ['concat:css', 'px2rem']
      },
      icons: {
        files: ['src/images/icons/*.png'],
        tasks: ['autoicons', 'sync', 'concat:css', 'px2rem']
      }
    },

    connect: {
      dev: {
        options: {
          // 经过测试 connect插件会依照base的定义顺序检索文件
          // 这意味着如果存在相同文件，定义在前面的会优先返回
          base: ['.', '<%= config.folder %>'],
          port: '<%= config.port %>',
          // open: 'http://127.0.0.1:<%= config.port %>/works/',
          livereload: '<%= config.livereload%>',
          hostname: '*'
        }
      }
    },

    sync: {
      src2dest: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**/*.{html,css,js,ico,png,txt,gif,jpg,jpeg,svg,eot,ttf,woff,json}'],
          dest: '<%= config.folder %>'
        }]
      },
      vendor: {
        files: [{
          expand: true,
          cwd: 'vendor',
          src: ['lib/**/*.js'],
          dest: '<%= config.folder %>/vendor/'
        }]
      }
    },

    autoicons: {
      options: {
        rename: function (name) {
          if (name.indexOf('-active') !== -1) {
            var base = name.replace('-active', '');
            name = name + ', :active > .icon-' + base + ', .active > .icon-' + base;
          }
          return name;
        },
        repath: function (path) {
          return path.replace('src/', '../');
        }
      },
      icons: {
        src: 'src/images/icons/*.png',
        dest: 'src/css/icons.css'
      }
    }
  });

  // 开发
  grunt.registerTask('default', function () {
    grunt.config('config.folder', 'temp');
    grunt.task.run([
      'autoicons',
      'clean:dev',
      'sync',
      'concat',
      'px2rem',
      'connect',
      'watch'
    ]);
  });

  // 打包
  grunt.registerTask('dist', function () {
    grunt.config('config.folder', 'dist');
    grunt.task.run([
      'autoicons',
      'clean:dev',
      'sync',
      'concat',
      'px2rem',
      'cssmin',
      'uglify'
    ]);
  });

  // 语法检查
  grunt.registerTask('hint', function () {
    grunt.config('config.folder', 'temp');
    grunt.task.run(['jshint:dev']);
  });

};