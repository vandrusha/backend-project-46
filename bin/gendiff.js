#!/usr/bin/env node
import { Command } from 'commander';
const program = new Command();
program
    .name('gendiff')
    .version('1.0.0')
    .option('-h, --help', 'display help for command')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
        console.log('filepath1:', filepath1);
        console.log('filepath2:', filepath2);
    })
    .option('-f, --format <type>', 'output format')
program.parse();
