import _ from 'lodash';

const ind = (num) => ' '.repeat(num);
const sortObj = (obj) => Object
  .keys(obj)
  .sort((a, b) => a > b ? 1 : -1)
  .reduce((a, b) => { a[b] = obj[b]; return a; }, {});
const objToStr = (obj, mul) => {
  let result = '';
  _.forIn(obj, (value, key) => {
    if (_.isObject(value)) {
      result += `\n${ind(mul + 2)}${key}: {${objToStr(value, mul + 4)}\n${ind(mul + 2)}}`;
    } else {
      result += `\n${ind(mul + 2)}${key}: ${value}`;
    }
  });
  return `${result}`;
};
const stylish = (file) => {
  const iter = (fileObj, mul) => {
    const sortedObj = sortObj(fileObj);
    let result = '';
    const stateMap = {
      equal: ' ',
      removed: '-',
      updated: '-',
      added: '+',
    };
    _.forIn(sortedObj, (value, key) => {
      const pattern = `${ind(mul)}${stateMap[value.state]} ${key}: `;
      if (value.state === 'equal') {
        if (_.values(value.children).length !== 0) {
          result += `${pattern}{\n${iter(value.children, mul + 4)}${ind(mul + 2)}}`;
        } else {
          result += `${pattern}${value.origValue}`;
        }
      } else if (value.state === 'removed' || value.state === 'added') {
        if (_.isObject(value.origValue)) {
          result += `${pattern}{${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}`;
        } else {
          result += `${pattern}${value.origValue}`;
        }
      } else {
        result += _.isObject(value.origValue)
          ? `${ind(mul)}- ${key}: {${objToStr(value.origValue, mul + 4)}\n${ind(mul + 2)}}\n`
          : `${ind(mul)}- ${key}: ${value.origValue}\n`;
        result += _.isObject(value.newValue)
          ? `${ind(mul)}+ ${key}: {${objToStr(value.newValue, mul + 4)}\n${ind(mul + 2)}}`
          : `${ind(mul)}+ ${key}: ${value.newValue}`;
      }
      result += '\n';
    });
    return result;
  };
  return `{\n${iter(file, 2)}}`;
};
export default stylish;
