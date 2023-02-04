import YAML from 'yaml';

const parser = (file, ext) => {
  if (ext === '.json') {
    return JSON.parse(file);
  }
  if (ext === '.yaml' || ext ==='.yml') {
    return YAML.parse(file);
  }
};
export default parser;
