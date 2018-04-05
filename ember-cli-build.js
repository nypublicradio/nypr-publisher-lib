'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],
    'ember-font-awesome': {
      includeFontFiles: false
    }
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('node_modules/imagesloaded/imagesloaded.pkgd.js');

  return app.toTree();
};
