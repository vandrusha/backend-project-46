import _ from 'lodash';

const ind = (num) => ' '.repeat(num);
const sortObj = (obj) => {
  const sorted = _.sortBy(Object.keys(obj));
  return sorted.reduce((a, b) => ({ ...a, [b]: obj[b] }), {});
};
const objToStr = (obj, mul) => {
  const str = Object.entries(obj).reduce((acc, entry) => {
    const key = entry[0];
    const value = entry[1];
    if (_.isObject(value)) {
      return `${acc}\n${ind(mul + 2)}${key}: {${objToStr(value, mul + 4)}\n${ind(mul + 2)}}`;
    }
    return `${acc}\n${ind(mul + 2)}${key}: ${value}`;
  }, '');
  return `${str}`;
};
const stylish = (file) => {
  const iter = (fileObj, mul) => {
    const sortedObj = sortObj(fileObj);
    const stateMap = {
      equal: ' ',
      removed: '-',
      updated: '-',
      added: '+',
    };
    const result = Object.entries(sortedObj).reduce((acc, entry) => {
      const key = entry[0];
      const value = entry[1];
      const pattern = `${ind(mul)}${stateMap[value.state]} ${key}: `;
      if (value.state === 'equal') {
        if (_.values(value.children).length !== 0) {
          return `${acc}${pattern}{\n${iter(value.children, mul + 4)}${ind(mul + 2)}}\n`;
        }
        return `${acc}${pattern}${value.origValue}\n`;
      }
      if (value.state === 'removed' || value.state === 'added') {
        if (_.isObject(value.origValue)) {
          return `${acc}${pattern}{${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}\n`;
        }
        return `${acc}${pattern}${value.origValue}\n`;
      }
      const removedStr = _.isObject(value.origValue)
        ? `${ind(mul)}- ${key}: {${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}\n`
        : `${ind(mul)}- ${key}: ${value.origValue}\n`;
      const addedStr = _.isObject(value.newValue)
        ? `${ind(mul)}+ ${key}: {${objToStr(value.newValue, mul + 4)}\n${ind(mul + 2)}}\n`
        : `${ind(mul)}+ ${key}: ${value.newValue}\n`;
      return `${acc}${removedStr}${addedStr}`;
    }, '');
    return result;
  };
  return `{\n${iter(file, 2)}}`;
};
export default stylish;
