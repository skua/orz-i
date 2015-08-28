/* global module:false, require:true, __dirname:true */
var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
  var fs = require('fs');
  var path = require('path');
  var util = require('util');
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: {
      folder: 'dist',
      port: 3442,
      livereload: 35741
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


    concat: {
      options: {
        stripBanners: true
      },
      css: {
        src: ['src/css/base.css'],
        dest: '<%= config.folder %>/css/base.css'
      },
      js: {
        src: ['src/js/*.js'],
        dest: '<%= config.folder %>/js/base.js'
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
          src: ['**/*.js'], // Actual patterns to match
          dest: '<%= config.folder %>/js' // Destination path prefix
        }]
      }
    },


    watch: {
      options: {
        livereload: '<%= config.livereload%>'
      },
      sync: {
        files: ['src/**/*.{html,css,js,ico,png,txt,gif,jpg,jpeg,svg,eot,ttf,woff,json}'],
        tasks: ['sync']
      },
      js: {
        files: ['vendor/**/*.js'],
        tasks: ['concat:js']
      },
      combine: {
        files: ['src/css/base.css', 'src/css/icons.css'],
        tasks: ['concat:css']
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

    },

  });

  // // 开发
  // grunt.registerTask('default', function() {
  //   grunt.config('config.folder', 'temp');
  //   grunt.task.run([
  //     'clean:dev',
  //     'sync',
  //     'concat',
  //     'connect',
  //     'watch'
  //   ]);
  // });

  // 打包
  grunt.registerTask('default', function() {
    grunt.config('config.folder', 'dist');
    grunt.task.run([
      'clean:dev',
      'sync',
      'concat',
      'cssmin',
      'uglify'
    ]);
  });



};