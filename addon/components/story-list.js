import Component from 'ember-component';
import service from 'ember-service/inject';
import config from 'ember-get-config';

export default Component.extend({
  session: service(),
  tagName: 'section',
  adminURL: `${config.wnycAdminRoot}/admin`
});
