import { htmlSafe } from '@ember/string';
import { makeArray } from '@ember/array';
import Helper from '@ember/component/helper';
import get from 'ember-metal/get';

export function producingOrgs([ orgsList ]/*, hash*/, {unlinked=false}={}) {
  let producingString = '';

  makeArray(orgsList).forEach((org, idx) => {
    let line = '';

    if (unlinked){
      line = get(org,'name');
    } else {
      line = `<a href="${get(org, 'url')}" target="_blank" class="link link--dark">${get(org, 'name')}</a>`;
    }

    if (idx === get(orgsList, 'length') - 2){
      line += ' and ';
    } else if (idx < get(orgsList, 'length') - 1){
      line += ', ';
    }

    producingString += line;
  });

  return htmlSafe(`${producingString}`);
}

export default Helper.helper(producingOrgs);
