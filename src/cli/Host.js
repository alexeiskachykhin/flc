'use strict';

const FlaCompiler = require('./FlaCompiler');


const commandLineOptions = require('node-getopt').create([
    ['', 'interactiveCompiler=ARG', 'full path to Flash.exe'],
    ['', 'inputDirectory=ARG', 'full path to input directory'],
    ['', 'outputDirectory=ARG', 'full path to output directory'],
    ['', 'debug[=true|false]', 'activate session 0 debugging mode'],
    ['', 'includePattern[=PATTERN]', 'list of files to include in a build, all files will be included if ommited'],
    ['h', 'help', 'display this help']
])
.bindHelp()
.parseSystem();


const compilerConfig = {
    interactiveCompiler: commandLineOptions.options.interactiveCompiler,
    inputDirectory: commandLineOptions.options.inputDirectory,
    outputDirectory: commandLineOptions.options.outputDirectory,
    debug: ((commandLineOptions.options.debug || 'false') === 'true'),
    includePattern: (commandLineOptions.options.includePattern || '*.fla')
};

const compiler = new FlaCompiler(compilerConfig);
compiler.compile();