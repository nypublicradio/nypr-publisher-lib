import DS from 'ember-data';
import BucketItemModel from 'nypr-publisher-lib/models/bucket-item';
import { get, computed } from '@ember/object';
import { normalizeForSorting } from 'nypr-publisher-lib/helpers/normalize-for-sorting';
import { A } from '@ember/array';

export default BucketItemModel.extend({
  // BEGIN-SNIPPET channel-fields
  altLayout: DS.attr('boolean'),
  slug: DS.attr('string'),
  cmsPK: DS.attr('number'),
  title: DS.attr('string'),
  url: DS.attr('string'),
  siteId: DS.attr('number'),
  canonicalHost: computed('url', function() {
    let url = get(this, 'url');
    let hostMatch = url && url.match(/\/\/([^/]+)\//);
    if (hostMatch) {
      return hostMatch[1];
    }
    return undefined;
  }),
  sortableTitle: computed('title', function() {
    let title = this.getWithDefault('title', '');
    return normalizeForSorting([ title ]);
  }),
  about: DS.attr(),

  sidebarChunks: DS.attr(), // Array of custom html markup
  chunkSidebarTop: computed('sidebarChunks', {
    get() {
      const chunks = get(this, 'sidebarChunks');
      if (!chunks) {
        return '';
      }
      const chunk = A(A(chunks).compact()).findBy('position', 'top');
      if (chunk) {
        let text = chunk.content.replace(/\\x3C\/script>/g, '</script>');
        return this.store.createRecord('django-page', { text });
      } else {
        return '';
      }
    }
  }),
  chunkSidebarBottom: computed('sidebarChunks', {
    get() {
      const chunks = get(this, 'sidebarChunks');
      if (!chunks) {
        return '';
      }
      const chunk = A(A(chunks).compact()).findBy('position', 'bottom');
      if (chunk) {
        let text = chunk.content.replace(/\\x3C\/script>/g, '</script>');
        return this.store.createRecord('django-page', { text });
      } else {
        return '';
      }
    }
  }),
  tease: DS.attr('string'),
  teaseForDjangoPage: computed('tease', function() {
    let text = this.getWithDefault('tease', '').replace(/\\x3C\/script>/g, '</script>');
    return this.store.createRecord('django-page', { text });
  }),
  donateChunk: DS.attr(),
  headerDonateChunk: DS.attr('string'),

  linkroll: DS.attr(),
  donationUrl: DS.attr(),
  bgColor: DS.attr('string'),
  description: DS.attr('string'),
  marqueeImage: DS.attr(),
  studiosMarqueeImage: DS.attr(),
  studiosMarqueeMobileOffset: DS.attr('number'),
  podcastLinks: DS.attr(),
  rssFeed: DS.attr('string'),
  logoImage: DS.attr(),
  fbImage: DS.attr(),
  listingObjectType: DS.attr('string'),
  itemType: computed.readOnly('listingObjectType'),
  editLink: DS.attr('string'),
  socialLinks: DS.attr(),
  facebook: computed.filterBy('socialLinks', 'title', 'facebook'),
  twitter: computed.filterBy('socialLinks', 'title', 'twitter'),
  newsletter: computed.filterBy('socialLinks', 'title', 'newsletter'),
  featured: DS.belongsTo('story', { inverse: null }),
  scheduleSummary: DS.attr('string'),
  newsletterListId: DS.attr('string'),
  producingOrganizations: DS.attr(),
  nprAnalyticsDimensions: DS.attr(),
  itunesPodcastId: DS.attr('string'),
  // computeds
  hasLinkroll: computed.bool('linkroll.length'),
  hasMarquee: computed.bool('marqueeImage'),
  hasSubscriptionLinks: computed.bool('podcastLinks.length'),
  hasHeaderButtons: computed.or('donateChunk', 'hasSubscriptionLinks'),
  // END-SNIPPET
});
