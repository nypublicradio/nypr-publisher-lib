import { get, computed } from '@ember/object';
import DS from 'ember-data';

export default DS.Model.extend({
  // BEGIN-SNIPPET about-page-fields
  body: DS.attr('string'),
  people: DS.attr(),
  social: DS.attr(),
  escapedBody: computed('body', {
    get() {
      let body = get(this, 'body');
      return body.replace(/\\x3C\/script>/g, '</script>');
    }
  }),
  // END-SNIPPET
});
