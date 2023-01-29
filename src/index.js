import _ from 'lodash';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import parser from './parsers.js';
import formatter from '../formatters/index.js';

const makeCompObj = (state, origValue = '', newValue = '', children = {}) => ({
  state, origValue, newValue, children,
});
const comparator = (filepath1, filepath2, style = 'stylish') => {
  const resolvedPath1 = path.resolve(filepath1);
  const resolvedPath2 = path.resolve(filepath2);
  const parsedFile1 = readFileSync(resolvedPath1, 'utf8');
  const parsedFile2 = readFileSync(resolvedPath2, 'utf8');
  const fileExtension1 = path.extname(resolvedPath1);
  const fileExtension2 = path.extname(resolvedPath2);
  const obj1 = parser(parsedFile1, fileExtension1);
  const obj2 = parser(parsedFile2, fileExtension2);
  const diff = (file1, file2) => Object.entries(file1).reduce((acc, entry) => {
    const key = entry[0];
    const value = entry[1];
    if (!_.isObject(value)) {
      if (file2[key] === value) {
        acc[key] = makeCompObj('equal', value);
      } else if (_.has(file2, key)) {
        acc[key] = makeCompObj('updated', value, file2[key]);
      } else {
        acc[key] = makeCompObj('removed', value);
      }
    } else if (!_.has(file2, key)) {
      acc[key] = makeCompObj('removed', value);
    } else if (!_.isObject(file2[key])) {
      acc[key] = makeCompObj('updated', value, file2[key]);
    } else {
      acc[key] = makeCompObj('equal', '', '', diff(value, file2[key]));
    }
    Object.entries(file2)
      .filter(entry2 => !_.has(file1, entry2[0]))
      .map(entry2 => acc[entry2[0]] = makeCompObj('added', entry2[1]));
    return acc;
  }, {});
  const diffArr = diff(obj1, obj2);
  return formatter(diffArr, style);
};
export default comparator;
