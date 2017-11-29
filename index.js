/* eslint-env node */
'use strict';

const path = require('path');
const MergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'nypr-publisher-lib',
  included: function(app) {
    this.addonConfig = this.app.project.config(app.env)['ember-cli-mirage'] || {};
    this.mirageSupportDirectory = path.join(this.root, 'mirage-support');

    this._super.included.apply(this, arguments);
  },
  treeForApp(appTree) {
    var trees = [appTree];

    if (this._shouldIncludeMirageFiles()) {//only in dev and test
      let mirageFolderName = 'mirage-support';
      let mirageOptions = this.app.options[mirageFolderName];
      let isDummyApp = this.app.name === 'dummy';

      if (isDummyApp || mirageOptions) {//only if options['mirage-support'] in config
        if (isDummyApp || mirageOptions.includeAll) {//only if options['mirage-support'].includeAll = true
          trees.push(new Funnel(this.mirageSupportDirectory, {
            destDir: 'mirage',
            exclude: mirageOptions && mirageOptions.exclude || []
          }));
        } else if (mirageOptions.include) {//else add in options['mirage-support'].include the files needed
          trees.push(new Funnel(this.mirageSupportDirectory, {
            destDir: 'mirage',
            include: mirageOptions.include
          }));
        }
      }
    }

    return new MergeTrees(trees, {
      overwrite: true
    });
  },

  _shouldIncludeMirageFiles() {
    if (process.env.EMBER_CLI_FASTBOOT) {
      return false;
    }

    let enabledInProd = this.app.env === 'production' && this.addonConfig.enabled,
      explicitExcludeFiles = this.addonConfig.excludeFilesFromBuild;

    return enabledInProd || (this.app.env !== 'production' && explicitExcludeFiles !== true);//eslint-disable-line
  },
  isDevelopingAddon: function() {
    return true;
  }
};
