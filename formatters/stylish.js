import _ from 'lodash';

const ind = (num) => ' '.repeat(num);
const sortObj = (obj) => Object
  .keys(obj)
  .sort((a, b) => a > b ? 1 : -1)
  .reduce((a, b) => { a[b] = obj[b]; return a; }, {});
const objToStr = (obj, mul) => {
  let str = '';
  _.forIn(obj, (value, key) => {
    if (_.isObject(value)) {
      str += `\n${ind(mul + 2)}${key}: {${objToStr(value, mul + 4)}\n${ind(mul + 2)}}`;
    } else {
      str += `\n${ind(mul + 2)}${key}: ${value}`;
    }
  });
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
          acc += `${pattern}{\n${iter(value.children, mul + 4)}${ind(mul + 2)}}`;
        } else {
          acc += `${pattern}${value.origValue}`;
        }
      } else if (value.state === 'removed' || value.state === 'added') {
        if (_.isObject(value.origValue)) {
          acc += `${pattern}{${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}`;
        } else {
          acc += `${pattern}${value.origValue}`;
        }
      } else {
        acc += _.isObject(value.origValue)
          ? `${ind(mul)}- ${key}: {${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}\n`
          : `${ind(mul)}- ${key}: ${value.origValue}\n`;
          acc += _.isObject(value.newValue)
          ? `${ind(mul)}+ ${key}: {${objToStr(value.newValue, mul + 4)}\n${ind(mul + 2)}}`
          : `${ind(mul)}+ ${key}: ${value.newValue}`;
      }
      acc += '\n';
      return acc;
    }, '');
    return result;
  };
  return `{\n${iter(file, 2)}}`;
};
export default stylish;
