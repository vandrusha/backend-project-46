import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const selector = (diffArr, style) => {
  let result;
  switch (style) {
    case 'stylish':
      result = stylish(diffArr);
      break;
    case 'plain':
      result = plain(diffArr);
      break;
    case 'json':
      result = json(diffArr);
      break;
    default:
      result = stylish(diffArr);
  }
  return result;
};
export default selector;
