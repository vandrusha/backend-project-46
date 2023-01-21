import { beforeAll, test, expect } from '@jest/globals';
import comparator from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import YAML from 'yaml';
//import { beforeAll } from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let jsonFile1;
let jsonFile2
let yamlFile1;
let yamlFile2;
let expectedResult;
let expectedPlain;

beforeAll(() => {
    jsonFile1 = JSON.parse(readFile('file1.json'));
    jsonFile2 = JSON.parse(readFile('file2.json'));
    yamlFile1 = YAML.parse(readFile('file1.yaml'));
    yamlFile2 = YAML.parse(readFile('file2.yaml'));
    expectedResult = String(readFile('expectedResult.txt'));
    expectedPlain = String(readFile('expectedPlain.txt'));
});
test('json files, default format', () => {
    expect(comparator(jsonFile1, jsonFile2)).toEqual(expectedResult);
});
test('yaml files, default format', () => {
    expect(comparator(yamlFile1, yamlFile2)).toEqual(expectedResult);
});
test('plain format', () => {
    expect(comparator(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
});