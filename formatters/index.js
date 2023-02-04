import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selector = (diffArr, style) => {
  if (style === 'json') {
    return json(diffArr);
  } else if (style === 'plain') {
    return plain(diffArr);
  }
  return stylish(diffArr);
};

export default selector;
