/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-plantuml',

  includedCommands: function() {
    return {
      'generate-uml': require('./lib/commands/plantuml')
    };
  }
};
