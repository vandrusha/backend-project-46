import _ from 'lodash';

const sortObj = (obj) => {
  const sorted = _.sortBy(Object.keys(obj));
  return sorted.reduce((a, b) => ({ ...a, [b]: obj[b] }), {});
};
const plain = (file, root = '') => {
  const sortedObj = sortObj(file);
  const parsedValue = (val) => {
    const valType = typeof val;
    if (valType === 'string') {
      return `'${val}'`;
    }
    if (valType === 'object') {
      return val === null ? 'null' : '[complex value]';
    }
    return val;
  };
  return Object.entries(sortedObj)
    .reduce((acc, entry) => {
      const key = entry[0];
      const value = entry[1];
      if (value.state === 'removed') {
        return [...acc, `Property '${root}${key}' was removed`];
      }
      if (value.state === 'added') {
        return [...acc, `Property '${root}${key}' was added with value: ${parsedValue(value.origValue)}`];
      }
      if (value.state === 'equal') {
        if (_.values(value.children).length !== 0) {
          return [...acc, plain(value.children, `${root}${key}.`)];
        }
      } else {
        if (_.isObject(value.origValue) && _.isObject(value.newValue)) {
          return [...acc, `Property '${root}${key}' was updated. From [complex value] to [complex value]`];
        }
        if (!_.isObject(value.origValue) && _.isObject(value.newValue)) {
          return [...acc, `Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to [complex value]`];
        }
        if (_.isObject(value.origValue) && !_.isObject(value.newValue)) {
          return [...acc, `Property '${root}${key}' was updated. From [complex value] to ${parsedValue(value.newValue)}`];
        }
        return [...acc, `Property '${root}${key}' was updated. From ${parsedValue(value.origValue)} to ${parsedValue(value.newValue)}`];
      }
      return acc;
    }, [])
    .join('\n');
};

export default plain;
