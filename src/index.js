import _ from 'lodash';
const comparator = (file1, file2) => {
    let results = [];
    _.forIn(file1, (value, key) => {
        if (_.has(file2, key) && file2[key] === value) {
            results.push([' ', key, value]);
        } else if (_.has(file2, key)) {
            results.push(['-', key, value]);
            results.push(['+', key, file2[key]]);
        } else {
            results.push(['-', key, value]);
        }
    });
    _.forIn(file2, (value, key) => {
        if (!_.has(file1, key)) {
            results.push(['+', key, value]);
        }
    })
    const sortedResults = _.sortBy(results, a => a[1]);
    const diffStr = sortedResults
        .map(item => `${item[0]} ${item[1]}: ${item[2]}`)
        .join('\n');
    console.log(`{\n${diffStr}\n}`);
};
export default comparator;