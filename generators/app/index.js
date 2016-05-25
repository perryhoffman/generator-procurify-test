'use strict';

var yeoman = require('yeoman-generator');
var chalk  = require('chalk');
var _      = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {

    var prompts = [{
        name: 'module',
        message: 'What procurify ' + chalk.green('module') + ' would you like to test (the folder name inside modules directory)?'
    }, {
        name    : 'angularmodule',
        message : 'What is the name of the angular module?',
        default : 'YourAngularApp'
    }, {
        name    : 'controller',
        message : 'What is the name of the main angular controller in the app?',
        default : 'YourAngularAppCtrl'
    }, {
        name    : 'routing',
        message : 'Will you be testing any routes in your app?',
        type    : 'confirm',
        default : false
    }, {
        name    : 'services',
        message : 'Will you be testing services?',
        type    : 'confirm',
        default : false
    }, {
        name    : 'modal',
        message : 'Will you be testing any modals?',
        type    : 'confirm',
        default : false
    }];

    return this.prompt(prompts).then(function (props) {

      this.props = props;
      if(this.props.module) {
          this.props.module_uppercase = _.upperCase(this.props.module);
      }
      this.props.module_base = 'static/modules/';

      this.props.test_dir  = this.props.module_base + this.props.module + '/tests/';
      this.props.spec_dir  = this.props.module_base + this.props.module + '/tests/spec/';
      this.props.mock_dir  = this.props.module_base + this.props.module + '/tests/mock/';
    }.bind(this));
  },

  writing: {
     scaffoldFolders: function() {
        this.mkdir(this.props.test_dir);
        this.mkdir(this.props.spec_dir);
        this.mkdir(this.props.mock_dir);
    },
    writeFiles: function() {
        this.template('_requirements.js', this.props.test_dir + '/requirements.js', this.props);
        this.template('_mock.js', this.props.mock_dir + '/' + this.props.module + '.mock.js', this.props);
        this.template('_spec.js', this.props.spec_dir + '/' + this.props.module + '.spec.js', this.props);
    }
  }
});
