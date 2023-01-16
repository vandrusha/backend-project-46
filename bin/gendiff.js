#!/usr/bin/env node
import { Command } from 'commander';
import comparator from '../src/index.js';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import YAML from 'yaml';

const program = new Command();
program
    .name('gendiff')
    .version('1.0.0')
    .option('-f, --format <type>', 'output format')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .parse()
    .action((filepath1, filepath2) => {
        const resolvedPath1 = path.resolve(filepath1);
        const resolvedPath2 = path.resolve(filepath2);
        const file1 = readFileSync(resolvedPath1);
        const file2 = readFileSync(resolvedPath2);
        const fileExtension1 = path.extname(resolvedPath1);
        const fileExtension2 = path.extname(resolvedPath2);
        let fileObj1;
        switch (fileExtension1) {
            case '.json':
                fileObj1 = JSON.parse(file1);
                break
            case '.yaml':
                fileObj1 = YAML.parse(file1);
                break
        }
        let fileObj2;
        switch (fileExtension2) {
            case '.json':
                fileObj2 = JSON.parse(file2);
                break
            case '.yaml':
                fileObj2 = YAML.parse(file2);
                break
        }
        console.log(comparator(fileObj1, fileObj2));
    })
program.parse();
