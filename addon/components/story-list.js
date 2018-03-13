import Component from '@ember/component';
import { inject } from '@ember/service';
import config from 'ember-get-config';
import layout from '../templates/components/story-list';

export default Component.extend({
  layout,
  classNames: ['story-list'],
  session: inject(),
  tagName: 'section',
  adminURL: `${config.adminRoot}/admin`
});
