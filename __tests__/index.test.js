import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import comparator from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const jsonFile1 = getFixturePath('file1.json');
const jsonFile2 = getFixturePath('file2.json');
const yamlFile1 = getFixturePath('file1.yaml');
const yamlFile2 = getFixturePath('file2.yaml');
const expectedResult = String(readFile('expectedResult.txt'));
const expectedPlain = String(readFile('expectedPlain.txt'));
const expectedJson = String(readFile('expectedJson.txt'));
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
