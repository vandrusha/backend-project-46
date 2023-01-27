import { beforeAll, test, expect } from '@jest/globals';
import comparator from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

let jsonFile1;
let jsonFile2
let yamlFile1;
let yamlFile2;
let expectedResult;
let expectedPlain;
let expectedJson;

beforeAll(() => {
    jsonFile1 = getFixturePath('file1.json');
    jsonFile2 = getFixturePath('file2.json');
    yamlFile1 = getFixturePath('file1.yaml');
    yamlFile2 = getFixturePath('file2.yaml');
    expectedResult = readFile('expectedResult.txt');
    expectedPlain = readFile('expectedPlain.txt');
    expectedJson = readFile('expectedJson.txt');
});
test('json files, default format', () => {
    expect(comparator(jsonFile1, jsonFile2)).toEqual(expectedResult);
});
test('yaml files, default format', () => {
    expect(comparator(yamlFile1, yamlFile2, 'stylish')).toEqual(expectedResult);
});
test('plain format', () => {
    expect(comparator(jsonFile1, jsonFile2, 'plain')).toEqual(expectedPlain);
});
test('json format', () => {
    expect(comparator(jsonFile1, jsonFile2, 'json')).toEqual(expectedJson);
});