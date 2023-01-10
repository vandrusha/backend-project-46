const { Command } = require('commander');
const program = new Command();
program
    .name('gendiff')
    .description('CLI to some JavaScript string utilities')
    .version('1.0.0');
program.command('gendiff')
    .description('Compares 1 two configuration files and shows a difference.')
    .option('-V, --version', 'output the version number')
    .option('-h, --help', 'display help for command');
program.parse();
export default program;