import { Command } from 'commander';
import pkg from '../package.json';

const program = new Command();
program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .requiredOption('--parse <logLevel>','Log level')
    .option('--details <regex>','Log details')
    .option('--error <regex>','Log error message')
    .requiredOption('--input <inputFile>', 'Log file path that will be parsed. The extension should be *.log')
    .requiredOption('--output <outputFile>', 'Output file path that will be written');

export default program;
