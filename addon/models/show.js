import DS from 'ember-data';
import ChannelModel from 'nypr-publisher-lib/models/channel';

export default ChannelModel.extend({
  // BEGIN-SNIPPET show-fields
  image: DS.belongsTo('image'),
  producingOrganizations: DS.hasMany('producing-organization'),
  contactEmail: DS.attr('string')
  // END-SNIPPET
});
