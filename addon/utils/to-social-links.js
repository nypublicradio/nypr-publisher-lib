/*
converts:

  [{
    "contact-string": "@BrianLehrer",
    "service": "twitter"
  }]

to:

  [{
    "title": "twitter",
    "href": "https://twitter.com/BrianLehrer"
  }]
*/

export default function(social) {
  return social.filter((item) => {
    return item['contact-string'] && item['service'];
  }).map((item) => {
    switch(item['service']) {
      case 'facebook':
        return {
          title: 'facebook',
          href: `https://www.facebook.com/${item['contact-string']}`
        };
      case 'twitter':
        return {
          title: 'twitter',
          href: `https://twitter.com/${item['contact-string'].replace('@','')}`
        };
      case 'instagram':
        return {
          title: 'instagram',
          href: `https://www.instagram.com/${item['contact-string']}`
        };
      default:
        return {
          title: item['service'],
          href: item['contact-string']
        };
      }
  });
}
