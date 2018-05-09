import DS from 'ember-data';
import { get, computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  // audio: DS.attr('string'),
  url: DS.attr('string'),
  image: DS.attr(),
  targetType: DS.attr('string'),
  targetId: DS.attr('number'),
  target: computed('targetType', 'targetId', function() {
    let type = get(this, 'targetType');
    let id = get(this, 'targetId');
    switch(type) {
      case 'story':
      case 'show':
        return DS.PromiseObject.create({
          promise: this.store.findRecord(type, id)
        });
      default:
        return {};
      }
  }),
  unknownProperty(key) {
    let target = get(this, 'target');
    if (target)
      return get(target, key);
    else {
      return undefined;
    }
  }
});
