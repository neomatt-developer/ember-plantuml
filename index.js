/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-plantuml',

  includedCommands: function() {
    return {
      plantuml: require('./lib/commands/plantuml')
    };
  }
};
