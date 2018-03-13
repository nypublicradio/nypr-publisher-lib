import { helper } from '@ember/component/helper';

export function capitalizeWord([ value ]){
  if ( value ) {
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export default helper(capitalizeWord);
