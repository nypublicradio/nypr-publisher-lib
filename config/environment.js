'use strict';

module.exports = function(/* environment, appConfig */) {
  let ENV = {
    fontawesome: {
      icons: {
        'free-solid-svg-icons': 'envelope',
        'free-brands-svg-icons': [
          'facebook',
          'twitter'
        ]
      }
    }
  };
  return ENV;
};
