import another from './another-module.js';
import componentNormalizer from 'component-normalizer';

export function a() {
  return 1;
}

export function b() {
  return another;
}

console.log('componentNormalizer', componentNormalizer)

export const cn = componentNormalizer;
