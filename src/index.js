import _ from 'lodash';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { parser } from './parsers.js';
import formatter from '../formatters/index.js';

const makeCompObj = (state, origValue = '', newValue = '', children = {}) => ({
    state, origValue, newValue, children
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
    const diff = (file1, file2) => {
        const results = {};
        _.forIn(file1, (value, key) => {
            if (!_.isObject(value)) {
                if (_.has(file2, key) && file2[key] === value) {
                    results[key] = makeCompObj('equal', value);
                } else if (_.has(file2, key)) {
                    results[key] = makeCompObj('updated', value, file2[key]);
                } else {
                    results[key] = makeCompObj('removed', value);
                }
            } else if (!_.has(file2, key)) {
                results[key] = makeCompObj('removed', value);
            } else if (!_.isObject(file2[key])) {
                results[key] = makeCompObj('updated', value, file2[key]);
            } else {
                results[key] = makeCompObj('equal', '', '', diff(value, file2[key]));
            }
        });
        _.forIn(file2, (value, key) => {
            if (!_.has(file1, key)) {
                results[key] = makeCompObj('added', value);
            }
        });
        return results;
    };
    const diffArr = diff(obj1, obj2);
    return formatter(diffArr, style);
};
export default comparator;
