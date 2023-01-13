import { test, expect } from '@jest/globals';
import comparator from '../src/index.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { beforeAll } from 'node:test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let file1;
let file2;

beforeAll(() => {
    file1 = readFile('file1.json');
    file2 = readFile('file2.json');
});

test('comparator', () => {
    expect(comparator(file1, file2)).toBe(`{
        - follow: false
          host: hexlet.io
        - proxy: 123.234.53.22
        - timeout: 50
        + timeout: 20
        + verbose: true
        }`);
});