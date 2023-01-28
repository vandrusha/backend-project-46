#!/usr/bin/env node
import { Command } from 'commander';
import comparator from '../src/index.js';

const program = new Command();
program
  .name('gendiff')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format. Stylish is used by default')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const formatType = options.format;
    console.log(comparator(filepath1, filepath2, formatType));
  });
program.parse();
