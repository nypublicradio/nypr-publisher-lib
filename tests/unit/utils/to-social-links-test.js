import toSocialLinks from 'dummy/utils/to-social-links';
import { module, test } from 'qunit';

module('Unit | Utility | to social links');

test('it creates a list of social links', function(assert) {
  const social = [{
    "contact-string": "@BrianLehrer",
    "service": "twitter"
  },{
    "contact-string": "",
    "service": "facebook"
  },{
    "contact-string": "",
    "service": "instagram"
  }];
  const expected = [{
    "href": "https://twitter.com/BrianLehrer",
    "title": "twitter"
  }];
  const actual = toSocialLinks(social);
  assert.equal(actual.length, expected.length);
  assert.deepEqual(actual[0], expected[0]);
});

