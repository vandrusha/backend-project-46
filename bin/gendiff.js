import { Command } from 'commander';
const program = new Command();
program
    .name('gendiff')
    .option('-h, --help', 'display help for command')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
program.parse();
if (program.opts().h || program.opts().help) program.help();