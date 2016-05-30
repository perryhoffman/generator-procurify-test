'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-procurify-test-generator:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        module: 'TestModule',
        angularmodule: 'TestAngularApp',
        controller: 'TestAngularCtrl',
        routing: false,
        services: false,
        modal: false
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'TestModule/tests/requirements.js',
      'TestModule/tests/mock/TestModule.mock.js',
      'TestModule/tests/spec/TestModule.spec.js'
    ]);
  });
});
