import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selector = (diffArr, style) => {
  if (style === 'json') {
    return json(diffArr);
  }
  if (style === 'plain') {
    return plain(diffArr);
  }
  return stylish(diffArr);
};

export default selector;
