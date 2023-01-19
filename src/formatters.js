import _ from 'lodash';

const ind = (num) => {
    return ' '.repeat(num);
}

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
    const iter = (arr, mul) => {
        const sortedArr = _.sortBy(arr, a => a[1]);
        let diffStr = sortedArr
            .map(item => {
                let result = '';
                if (_.isArray(item[2])) {
                    result = `${ind(mul)}${item[0]} ${item[1]}: {\n${iter(item[2], mul + 4)}\n${ind(mul + 2)}}`;
                } else if (_.isObject(item[2])) {
                    result = `${ind(mul)}${item[0]} ${item[1]}: {${objToStr(item[2], mul + 4)}\n${ind(mul + 2)}}`;
                } else {
                    result = `${ind(mul)}${item[0]} ${item[1]}: ${item[2]}`;
                }
                return result;
            })
            .join('\n');
        return diffStr;
    }
    return `{\n${iter(file, 2)}\n}`;
};

export { stylish };