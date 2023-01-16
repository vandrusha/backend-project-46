import { beforeAll, test, expect } from '@jest/globals';
import comparator from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
//import { beforeAll } from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let file1;
let file2;
let expectedResult;

beforeAll(() => {
    file1 = JSON.parse(readFile('file1.json'));
    file2 = JSON.parse(readFile('file2.json'));
    expectedResult = String(readFile('expectedResult.txt'));
});
test('comparator', () => {
    console.log('expectedResult:', expectedResult);
    expect(comparator(file1, file2)).toEqual(expectedResult);
});