import _ from 'lodash';

const sortObj = (obj) => Object
  .keys(obj)
  .sort((a, b) => a > b ? 1 : -1)
  .reduce((a, b) => { a[b] = obj[b]; return a; }, {});

const plain = (file, root = '') => {
  const sortedObj = sortObj(file);
  const result = [];
  const parsedValue = (val) => {
    let parsedVal;
    switch (typeof val) {
    case 'string':
      parsedVal = `'${val}'`;
      break;
    case 'object':
      parsedVal = val === null ? 'null' : '[complex value]';
      break;
    default:
      parsedVal = val;
    }
    return parsedVal;
  };
  _.forIn(sortedObj, (value, key) => {
    if (value.state === 'removed') {
      result.push(`Property '${root}${key}' was removed`);
    } else if (value.state === 'added') {
      result.push(`Property '${root}${key}' was added with value: ${parsedValue(value.origValue)}`);
    } else if (value.state === 'equal') {
        if (_.values(value.children).length !== 0) {
          result.push(plain(value.children, `${root}${key}.`));
        }
    } else {
      if (_.isObject(value.origValue) && _.isObject(value.newValue)) {
        result.push(`Property '${root}${key}' was updated. From [complex value] to [complex value]`);
      } else if (!_.isObject(value.origValue) && _.isObject(value.newValue)) {
        result.push(`Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to [complex value]`);
      } else if (_.isObject(value.origValue) && !_.isObject(value.newValue)) {
        result.push(`Property '${root}${key}' was updated. From [complex value] to ${parsedValue(value.newValue)}`);
      } else {
        result.push(`Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to ${parsedValue(value.newValue)}`);
      }
    }
  });
  return result.join('\n');
};

export default plain;
