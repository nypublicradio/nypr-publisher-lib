import { Factory, faker } from 'ember-cli-mirage';
import { dasherize } from '@ember/string';

const slugify = str => dasherize(str.replace(/[^\w\s]/gi, '-'));

function generateProducingOrg() {
  return {
    url: faker.internet.url(),
    name: faker.company.companyName(),
    logo: {}
  };
}

export default Factory.extend({
  cmsPK: () => faker.random.number(),
  slug: () => slugify(faker.name.findName()),
  /* eslint-disable */
  about: {
    body: '<h1>About</h1>'
  },
  /* eslint-enable */
  title() {
    return `${faker.name.findName()} Show`;
  },
  producingOrganizations() {
    let org = [generateProducingOrg()];

    if (faker.random.boolean()) {
      org.push(generateProducingOrg());
    }

    return org;
  },
  tease: () => faker.lorem.sentences(),
  isFeatured: false,
});
