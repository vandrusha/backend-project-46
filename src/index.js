import _ from 'lodash';
import * as formatter from './formatters.js'

const comparator = (obj1, obj2, style = 'stylish') => {
    const diff = (file1, file2) => {
        const results = [];
        _.forIn(file1, (value, key) => {
            if (!_.isObject(value)) {
                if (_.has(file2, key) && file2[key] === value) {
                    results.push([' ', key, value]);
                } else if (_.has(file2, key)) {
                    results.push(['-', key, value]);
                    results.push(['+', key, file2[key]]);
                } else {
                    results.push(['-', key, value]);
                }
            } else if (!_.has(file2, key)) {
                results.push(['-', key, value]);
            } else if (!_.isObject(file2[key])) {
                results.push(['-', key, value]);
                results.push(['+', key, file2[key]]);
            } else {
                results.push([' ', key, diff(value, file2[key])]);
            }
        });
        _.forIn(file2, (value, key) => {
            if (!_.has(file1, key)) {
                results.push(['+', key, value]);
            }
        });
        return results;
    }
    const diffArr = diff(obj1, obj2);
    return formatter[style](diffArr);
};
export default comparator;


    // let results = [];
    // _.forIn(file1, (value, key) => {
    //     if (_.has(file2, key) && file2[key] === value) {
    //         results.push([' ', key, value]);
    //     } else if (_.has(file2, key)) {
    //         results.push(['-', key, value]);
    //         results.push(['+', key, file2[key]]);
    //     } else {
    //         results.push(['-', key, value]);
    //     }
    // });
    // _.forIn(file2, (value, key) => {
    //     if (!_.has(file1, key)) {
    //         results.push(['+', key, value]);
    //     }
    // })
    // const sortedResults = _.sortBy(results, a => a[1]);

    // let diffStr = sortedResults
    //     .map(item => `${item[0]} ${item[1]}: ${item[2]}`)
    //     .join('\n');
    // diffStr = `{\n${diffStr}\n}`;
    // return diffStr;