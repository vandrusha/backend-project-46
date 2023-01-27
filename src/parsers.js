import YAML from 'yaml';

const parser = (file, ext) => {
    let parsedFile;
    switch (ext) {
        case '.json':
            parsedFile = JSON.parse(file);
            break;
        case '.yaml':
        case '.yml':
            parsedFile = YAML.parse(file);
            break;
        default:
            parsedFile = JSON.parse(file);
    }
    return parsedFile;
};
export default parser
    ;