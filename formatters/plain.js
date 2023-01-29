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
  return Object.entries(sortedObj)
    .reduce((acc, entry) => {
      const key = entry[0];
      const value = entry[1];
      if (value.state === 'removed') {
        acc.push(`Property '${root}${key}' was removed`);
      } else if (value.state === 'added') {
        acc.push(`Property '${root}${key}' was added with value: ${parsedValue(value.origValue)}`);
      } else if (value.state === 'equal') {
        if (_.values(value.children).length !== 0) {
          acc.push(plain(value.children, `${root}${key}.`));
        }
      } else {
        if (_.isObject(value.origValue) && _.isObject(value.newValue)) {
          acc.push(`Property '${root}${key}' was updated. From [complex value] to [complex value]`);
        } else if (!_.isObject(value.origValue) && _.isObject(value.newValue)) {
          acc.push(`Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to [complex value]`);
        } else if (_.isObject(value.origValue) && !_.isObject(value.newValue)) {
          acc.push(`Property '${root}${key}' was updated. From [complex value] to ${parsedValue(value.newValue)}`);
        } else {
          acc.push(`Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to ${parsedValue(value.newValue)}`);
        }
      }
      return acc;
    }, [])
    .join('\n');
};

export default plain;
