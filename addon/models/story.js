import { Promise as EmberPromise } from 'rsvp';
import BucketItemModel from 'nypr-publisher-lib/models/bucket-item';
import $ from 'jquery';
import DS from 'ember-data';
import config from 'ember-get-config';
import { get, getProperties, computed } from '@ember/object';
const { attr } = DS;
import moment from 'moment';

export default BucketItemModel.extend({
  // BEGIN-SNIPPET story-fields
  appearances: attr(),
  audio: attr(),
  audioType: 'on_demand',
  audioAvailable: attr('boolean'),
  audioDurationReadable: attr('string'),
  audioEventually: attr('boolean'),
  audioMayDownload: attr('boolean'),
  audioMayEmbed: attr('boolean'),
  audioMayStream: attr('boolean'),
  audioShowOptions: attr('boolean'),
  channel: attr('string'),
  channelTitle: attr('string'),
  chunks: attr(),
  commentsCount: attr('number'),
  cmsPK: attr('string'),
  correctionText: attr('string'),
  newsdate: attr('string'),
  editLink: attr('string'),
  embedCode: attr('string'),
  enableComments: attr('boolean'),
  estimatedDuration: attr('number'),
  headers: attr(),
  headerDonateChunk: attr('string'),
  // TODO: make this a relationship when stories come in only over /api/v3
  // right now they're still consumed from HTML and as part of listing pages
  // imageMain: DS.belongsTo('image'),
  imageMain: attr(),
  itemType: attr('string'),
  itemTypeId: attr('number'),
  isLatest: attr('boolean'),
  largeTeaseLayout: attr('boolean'),
  playlist: attr(),
  podcastLinks: attr(),
  producingOrganizations: attr(),
  publishAt: attr('string'),
  publishStatus: attr('string'),
  segments: attr(),
  series: attr(),
  show: attr('string'),
  showTitle: attr('string'),
  showTease: attr('string'),
  showProducingOrgs: attr(),
  slug: attr('string'),
  slideshow: attr(),
  tease: attr('string'),
  template: attr('string'),
  tags: attr(),
  title: attr('string'),
  transcript: attr('string'),
  twitterHeadline: attr('string'),
  twitterHandle: attr('string'),
  url: attr('string'),
  video: attr('string'),
  body: attr('string'),
  bodyDjango: computed ('body', function() {
    let text = get(this, 'body');
    return this.store.createRecord('django-page', { text });
  }),
  mainImageEligible: computed('template', 'imageMain', function(){
    let template = get(this, 'template');
    let imageWidth = get(this, 'imageMain.w');
    let imageDisplayFlag = get(this, 'imageMain.isDisplay');
    if (["story_video", "story_interactive", "story_noimage"].includes(template)) {
      return false;
    } else if (template === 'story_archives'){
      return true;
    } else if (imageWidth >= 800 && imageDisplayFlag === true){
      return true;
    }
  }),
  videoTemplate: computed.equal('template', 'story_video'),
  interactiveTemplate: computed.equal('template', 'story_interactive'),
  flushHeader: computed.or('mainImageEligible', 'videoTemplate', 'segments'),
  escapedBody: computed('body', {
    get() {
      let body = get(this, 'body');
      if (!body) {
        return '';
      }
      return body.replace(/\\x3C\/script>/g, '</script>');
    }
  }),
  futureArticle: computed('publishStatus','publishAt', function(){
    let publishStatus = this.get('publishStatus');
    let publishAt = this.get('publishAt');
    let currentDate = moment();
    if ((publishStatus === 'draft') || (publishStatus === 'published' && currentDate.isBefore(publishAt)) ){
      return true;
    }
    return false;
  }),
  pageChunks: computed('chunks', function(){
    //process the raw chunks into django-page records, if they are present
    let processedChunks = {};
    let chunksObj = get(this, 'chunks');
    for (var key in chunksObj){
      let text = chunksObj[key];
      if (text){
        let content = this.store.createRecord('django-page', { text });
        processedChunks[key] = content;
      }
    }
    return processedChunks;
  }),
  segmentedAudio: computed('audio', function() {
    return Array.isArray(get(this, 'audio'));
  }),
  commentSecurityURL(browserId) {
    let data = {
      content_type: 'cms.' + get(this, 'itemType'),
      object_pk: get(this, 'cmsPK'),
      bust_cache: Math.random()
    };
    if (browserId) {
      data.id = browserId;
    }
    return `${config.adminRoot}/comments/security_info/?${$.param(data)}`;
  },
  nprAnalyticsDimensions: attr(),
  allProducingOrgs: computed('producingOrganizations', 'showProducingOrgs', function(){
    let prodOrgs = get(this, 'producingOrganizations') || [];
    let showProdOrgs = get(this, 'showProducingOrgs') || [];
    let allProdOrgs = [];

    //combine show and story prod orgs into one array without dupes
    if (showProdOrgs.length){
      for(var i in showProdOrgs){
         var shared = false;
         for (var j in prodOrgs) {
             if (prodOrgs[j].name === showProdOrgs[i].name) {
                 shared = true;
                 break;
             }
           }
         if(!shared) {
          allProdOrgs.push(showProdOrgs[i]);
        }
      }
      allProdOrgs = allProdOrgs.concat(prodOrgs);
    } else {
      allProdOrgs = prodOrgs;
    }

    return allProdOrgs;
  }),

  // so Ember Simple Auth inludes a records ID when it saves
  toJSON() {
    var serializer = this.store.serializerFor('story');
    var snapshot = this._internalModel.createSnapshot();
    return serializer.serialize(snapshot, {includeId: true});
  },
  getNextSegment() {
    if (!get(this, 'segmentedAudio')) {
      return null;
    } else if (!this.hasNextSegment()) {
      // wrap around
      this.resetSegments();
      return get(this, 'audio')[0];
    } else {
      return get(this, 'audio')[this.incrementProperty('_currentSegment')];
    }
  },
  getCurrentSegment() {
    if (!get(this, 'segmentedAudio')) {
      return get(this, 'audio');
    } else {
      return get(this, 'audio')[get(this, '_currentSegment') || 0];
    }
  },
  hasNextSegment() {
    if (!get(this, 'segmentedAudio')) {
      return false;
    } else {
      return this.getCurrentSegment() !== get(this, 'audio')[get(this, 'audio').length-1];
    }
  },
  resetSegments() {
    if (!get(this, 'segmentedAudio')) {
      return get(this, 'audio');
    } else {
      this._currentSegment = 0;
      return this.getCurrentSegment();
    }
  },

  forListenAction(data = {}) {
    return EmberPromise.resolve(Object.assign({
      audio_type: 'on_demand',
      cms_id: get(this, 'cmsPK'),
      item_type: get(this, 'itemType') // episode, article, segment
    }, data));
  },

  forDfp() {
    return getProperties(this, 'tags', 'show', 'channel', 'series');
  }
  // END-SNIPPET
});
