'use strict';

const program = require('commander');
const FlaCompiler = require('./FlaCompiler');


program
    .version(require('../../package.json').version)
    .option('--interactive-compiler <path>', 'full path to Flash.exe')
    .option('--input-directory <path>', 'full path to input directory that contains FLA files')
    .option('--output-directory <path>', 'full path to input directory to put build artifacts into')
    .option('--include-pattern [pattern]', 'list of files to include in a build, default is *.fla', '*.fla')
    .option('--debug [value]', 'activate session 0 debugging mode', (value) => Boolean(parseInt(value)), false)
    .parse(process.argv);


const compilerConfig = {
    interactiveCompiler: program.interactiveCompiler,
    inputDirectory: program.inputDirectory,
    outputDirectory: program.outputDirectory,
    includePattern: program.includePattern,
    debug: program.debug
};

const compiler = new FlaCompiler(compilerConfig);
compiler.compile();