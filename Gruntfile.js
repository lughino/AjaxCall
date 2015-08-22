/**
 * Gruntfile config
 *
 * Author Luca Pau <luca.pau82@gmail.com>
 */

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');

  var paths = ['Gruntfile.js', 'src/**/*.es6', 'test/**/*.es6'];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      options: {
        force: true
      },
      target: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.es6'],
          dest: 'lib/',
          ext: '.js',
          extDot: 'first'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/',
          src: ['**/*.es6'],
          dest: 'test/',
          ext: '.js',
          extDot: 'first'
        }]
      }
    },
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.es6'],
          dest: 'lib/',
          ext: '.js',
          extDot: 'first'
        }]
      }
    },
    shell: {
      /*jshint camelcase: false */
      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      mocha_istanbul: {
        command: [
          'cd src',
          'for file in **/*.es6; do mv "$file" "${file%.es6}.js"; done',
          'echo files renamed in .js extension',
          'cd ..',
          './node_modules/.bin/babel-node ./node_modules/.bin/isparta cover' +
          ' --root "./src" ./node_modules/.bin/_mocha -- "./test/**/*.es6" ' +
          '--compilers js:babel/register --require "./test/index.js"',
          'echo coverage launched',
          'cd src',
          'for file in **/*.js; do mv "$file" "${file%.js}.es6"; done',
          'echo files renamed in .es6 extension',
          'echo DONE!'
        ].join(' && ')
      }
    },
    watch: {
      files: paths,
      tasks: [/*'eslint',*/ 'babel']
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false,
          clearRequireCache: false,
          require: 'test/index.js'
        },
        files: [{
          expand: true,
          cwd: 'test/',
          src: ['**/*.es6'],
          extDot: 'first'
        }]
      }
    }
  });

  grunt.registerTask('default', [/*'eslint',*/ 'babel']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('cover', ['shell:mocha_istanbul']);
};
