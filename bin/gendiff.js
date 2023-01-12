#!/usr/bin/env node
import { Command } from 'commander';
import comparator from '../src/index.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';

const program = new Command();
program
    .name('gendiff')
    .version('1.0.0')
    .option('-h, --help', 'display help for command')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        const resolvedPath1 = path.resolve(filepath1);
        const resolvedPath2 = path.resolve(filepath2);
        const file1 = readFileSync(resolvedPath1);
        const file2 = readFileSync(resolvedPath2);
        const fileObj1 = JSON.parse(file1);
        const fileObj2 = JSON.parse(file2);
        comparator(fileObj1, fileObj2);
    })
    .option('-f, --format <type>', 'output format')
program.parse();
