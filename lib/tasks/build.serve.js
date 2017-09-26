#! /usr/bin/env node
/**
  Copyright (c) 2015, 2017, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';

/**
 * ## Dependencies
 */
const app = require('../scopes/app');
const config = require('../../config');
const utils = require('../utils');
const CONSTANTS = require('../utils.constants');

/**
 * # Switch for 'build' and 'serve' tasks
 *
 * @public
 * @param {string} task
 * @param {string} [scope]
 * @param {string} [parameter]
 * @param {Object} [options]
 */
module.exports = function (task, scope, parameter, options) {
  switch (scope) {
    case config.tasks.build.scopes.app.name:
    case config.tasks.serve.scopes.app.name:
    case undefined:
      utils.ensureJetApp();
      app.runTooling(task, scope, parameter, options);
      break;
    default:
      if (CONSTANTS.SUPPORTED_PLATFORMS.indexOf(scope) > -1) {
        app.runTooling(task, scope, parameter, options);
      } else {
        utils.log.error(`Invalid platform ${scope}`);
      }
  }
};