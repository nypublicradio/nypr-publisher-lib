import config from 'ember-get-config';

export default function() {
  let baseUrl = config.wnycURL;

  this.get(`/api/v3/shows`);
  this.get(`/api/v3/buckets/:slug`, 'bucket');
  this.get(`/api/v3/story/detail/:id`, 'story');
  this.get(`/api/v3/story/:slug`, 'story');
  this.get(`/api/v3/channel/\*id`, 'api-response');
  this.get(`/api/v3/chunks/:id/`, 'chunk');
}
