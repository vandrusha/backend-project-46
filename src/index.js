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
    const iter = (key, value, newVal) => {
      if (!_.isObject(value)) {
        if (file2[key] === value) {
          return { [key]: makeCompObj('equal', value) };
        }
        if (_.has(file2, key)) {
          return { [key]: makeCompObj('updated', value, newVal) };
        }
        return { [key]: makeCompObj('removed', value) };
      }
      if (!_.has(file2, key)) {
        return { [key]: makeCompObj('removed', value) };
      }
      if (!_.isObject(newVal)) {
        return { [key]: makeCompObj('updated', value, newVal) };
      }
      return { [key]: makeCompObj('equal', '', '', diff(value, newVal)) };
    };
    const file1Obj = iter(entry[0], entry[1], file2[entry[0]]);
    const entry2Results = Object.entries(file2).reduce((acc2, entry2) => {
      const key2 = entry2[0];
      return !_.has(file1, entry2[0])
        ? { ...acc2, ...file1Obj, [key2]: makeCompObj('added', entry2[1]) }
        : { ...acc2, ...file1Obj };
    }, {});
    return { ...acc, ...entry2Results };
  }, {});
  const diffArr = diff(obj1, obj2);
  return formatter(diffArr, style);
};
export default comparator;
