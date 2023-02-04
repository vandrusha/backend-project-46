import YAML from 'yaml';

const parser = (file, ext) => {
  if (ext === '.yaml' || ext === '.yml') {
    return YAML.parse(file);
  }
  return JSON.parse(file);
};
export default parser;
