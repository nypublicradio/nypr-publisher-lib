import Component from 'ember-component';
import service from 'ember-service/inject';
import config from 'ember-get-config';
import layout from '../templates/components/story-list';

export default Component.extend({
  layout,
  classNames: ['story-list'],
  session: service(),
  tagName: 'section',
  adminURL: `${config.adminRoot}/admin`
});
