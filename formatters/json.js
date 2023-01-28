import _ from 'lodash';

const json = (file) => {
  const replacer = (key, value) => {
    if (value === '' || (_.isObject(value) && Object.keys(value).length === 0)) {
      return undefined;
    }
    return value;
  };
  return JSON.stringify(file, replacer);
};
export default json;
