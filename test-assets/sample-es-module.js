import another from './another-module.js';
import _ from 'amd!https://unpkg.com/lodash@4.17.5/lodash.js';

export function currentModuleFunction() {
  return 1;
}

export function loadedFromOtherModule() {
  return another;
}

export function importFromLodash() {
  return _.partition([1, 2, 3, 4], n => n % 2);
}
