import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['apiResponse'],
  typeKeyForModel(model) {
    // This is a Mirage serialization bug, the wrong serializer
    // is being used for 'story'.
    if (model.modelName === 'listing-page') {
      return 'channel';
    } else {
      return model.modelName.dasherize();
    }
  },
});
