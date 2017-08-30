/* eslint-env node */
'use strict';

module.exports = {
  name: 'nypr-publisher-lib',
  included: function() {
    this._super.included.apply(this, arguments);
  },
  isDevelopingAddon: function() {
    return true;
  }
};
