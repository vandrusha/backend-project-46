import YAML from 'yaml';

const parser = (file, ext) => {
    let parsedFile;
    switch (ext) {
        case '.json':
            parsedFile = JSON.parse(file);
            break
        case '.yaml':
        case '.yml':
            parsedFile = YAML.parse(file);
            break
    }
    return parsedFile;
}

export { parser };