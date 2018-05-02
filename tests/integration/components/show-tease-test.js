import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | show tease', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    const testShow = {
      'title': 'All Things Considered',
      'tease': "A wrap-up of the day's news, with features and interviews.",
      "image": {
        "creditsUrl": "",
        "name": "1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png",
        "source": null,
        "url": "http://www.wnyc.org/i/1400/1400/l/80/1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png",
        "h": 1400,
        "isDisplay": true,
        "crop": "l",
        "caption": "",
        "template": "http://www.wnyc.org/i/%s/%s/%s/%s/1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png",
        "w": 1400,
        "id": 151040,
        "creditsName": "WNYC Studios"
      },
      'producingOrganizations': [
        {'name': 'WNYC', 'url': 'http://www.wnyc.org'},
        {'name': 'NPR', 'url': 'http://www.npr.org'}
      ]
    };

    this.set("testShow", testShow);
    this.set("featured", false);
    this.set("simpleLayout", false);

    await render(
      hbs`{{show-tease show=testShow featuredSpot=featured data-category="Test Category" simpleLayout=simpleLayout}}`
    );

    assert.equal(this.element.querySelector(".flag").classList.contains("flag--med"), true, "Regular Show Tease has class flag-med");
    assert.equal(this.element.querySelector('.flag-body .text h4').textContent.trim(), 'WNYC and NPR', 'Producing orgs should render');
    assert.notOk(this.element.querySelector('.flag-body .text h4 a'), 'Producing orgs should not have links');
    assert.equal(this.element.querySelector('.flag-body .text h2').textContent.trim(), 'All Things Considered', 'Title should render correctly');
    assert.equal(this.element.querySelector('.flag-body .text .text-body--nopad').textContent.trim(), "A wrap-up of the day's news, with features and interviews.", 'Description should render correctly');
    assert.equal(this.element.querySelector('.flag-image img').getAttribute("src"), "http://www.wnyc.org/i/90/90/l/85/1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png", "Image is populated");
    assert.equal(this.element.querySelector('[data-category]').getAttribute("data-category"), "Test Category", "Tracking Category should render on title link");


    // check for edits when it is a featured item
    this.set("featured", true);

    assert.equal(this.element.querySelector(".flag").classList.contains("flag--luxe"), true, "Featured Spot has class flag-luxe");
    assert.equal(this.element.querySelector('.flag-body .text h4.text--lightgray').textContent.trim(), 'WNYC and NPR', 'Producing orgs should render');
    assert.notOk(this.element.querySelector('.flag-body .text h4 a'), 'Producing orgs should not have links');
    assert.equal(this.element.querySelector('.flag-body .text h2').textContent.trim(), 'All Things Considered', 'Title should render correctly');
    assert.equal(this.element.querySelector('.flag-body .text .text--default').textContent.trim(), "A wrap-up of the day's news, with features and interviews.", 'Description should render correctly');
    assert.equal(this.element.querySelector('.flag-image img').getAttribute("src"), "http://www.wnyc.org/i/150/150/l/85/1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png", "Image is populated");
    assert.equal(this.element.querySelector('[data-category]').getAttribute("data-category"), "Test Category", "Tracking Category should render on title link");

    // check for edits when using simple layout - no producing org or tease text
    this.set("featured", false);
    this.set("simpleLayout", true);
    assert.equal(this.element.querySelector(".flag").classList.contains("flag--med"), true, "Regular Show Tease has class flag-med");
    assert.notOk(this.element.querySelector('.flag-body .text h4'), 'Producing orgs should not render');
    assert.equal(this.element.querySelector('.flag-body .text h2').textContent.trim(), 'All Things Considered', 'Title should render correctly');
    assert.notOk(this.element.querySelector('.flag-body .text .text-body--nopad'), 'Description not render');
    assert.equal(this.element.querySelector('.flag-image img').getAttribute("src"), "http://www.wnyc.org/i/90/90/l/85/1/2DQ_1400X1400_NoWNYCSTUDIOS_2.png", "Image is populated");
    assert.equal(this.element.querySelector('[data-category]').getAttribute("data-category"), "Test Category", "Tracking Category should render on title link");

  });
});
