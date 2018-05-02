import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:numeric-duration', function(hooks) {
  setupRenderingTest(hooks);

  let testCases = [{
    description: 'should display correct time for 0',
    inputMs: 0,
    expected: '0:00'
  },{    description: 'should display correct time for seconds < 10',
    inputMs: 1 * 1000,
    expected: '0:01'
  },{
    description: 'should display correct time for seconds > 10',
    inputMs: 10 * 1000,
    expected: '0:10'
  },{
    description: 'should display correct time for minutes < 10',
    inputMs: 1 * 60 * 1000,
    expected: '1:00'
  },{
    description: 'should display correct time for minutes > 10',
    inputMs: 10 * 60 * 1000,
    expected: '10:00'
  },{
    description: 'should display correct time for hours',
    inputMs: 1 * 60 * 60 * 1000,
    expected: '1:00:00'
  }];

  testCases.forEach(testCase => {
    test(testCase.description, async function(assert) {
      this.set('inputValue', testCase.inputMs)
      await render(hbs`{{numeric-duration inputValue}}`);

      assert.equal(this.$().text().trim(), testCase.expected);
    });
  });
});
