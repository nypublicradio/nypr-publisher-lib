import DS from 'ember-data';
import ChannelModel from 'nypr-publisher-lib/models/channel';

export default ChannelModel.extend({
  image: DS.belongsTo('image'),
  producingOrganizations: DS.hasMany('producing-organization')
});
