import _ from 'lodash';
import formatter from '../formatters/index.js'
const makeCompObj = (state, origValue = '', newValue = '', children = {}) => ({ state, origValue, newValue, children });
const comparator = (obj1, obj2, style = 'stylish') => {
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
    }
    const diffArr = diff(obj1, obj2);
    return formatter(diffArr, style);
};
export default comparator;
