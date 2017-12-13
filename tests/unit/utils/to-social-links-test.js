import toSocialLinks from 'dummy/utils/to-social-links';
import { module, test } from 'qunit';

module('Unit | Utility | to social links');

test('it creates a list of social links', function(assert) {
  const social = [{
    "contact-string": "@BrianLehrer",
    "service": "twitter"
  },{
    "contact-string": "brianlehrerfacebook",
    "service": "facebook"
  },{
    "contact-string": "",
    "service": "instagram"
  }];
  const expected = [{
    "href": "https://www.facebook.com/brianlehrerfacebook",
    "title": "facebook"
  },{
    "href": "https://twitter.com/BrianLehrer",
    "title": "twitter"
  }];
  const actual = toSocialLinks(social);
  assert.equal(actual.length, expected.length);
  assert.deepEqual(actual[0], expected[0], 'it should show facebook first');
  assert.deepEqual(actual[1], expected[1], 'it should show twitter second');
});

