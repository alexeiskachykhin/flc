'use strict';

const readline = require('readline');
const path = require('path');

const ProxyTextThoughFileOperation = require('./operations/ProxyTextThoughFileOperation');
const TruncateFileOperation = require('./operations/TruncateFileOperation');
const ProcessExternalCommandsOperation = require('./operations/ProcessExternalCommandsOperation');
const ExecuteInteractiveCompilerOperation = require('./operations/ExecuteInteractiveCompilerOperation');


class FlaCompiler {

    constructor(config) {
        this._internalConfig = {
            interactiveCompiler: config.interactiveCompiler,
            inputDirectory: config.inputDirectory,
            outputDirectory: config.outputDirectory,
            includePattern: config.includePattern,
            debug: config.debug,

            buildPlan: path.join(__dirname, '..', 'automation', 'plans', 'AS3.jsfl'),
            logFile: path.join(config.outputDirectory, 'info.txt'),
            errorFile: path.join(config.outputDirectory, 'error.txt'),
            commandFile: path.join(config.outputDirectory, 'commands.txt')
        };
    }

    _wait() {
        console.log('FLA compiler is running. Press Enter to interrupt.');

        readline
            .createInterface(process.stdin, process.stdout)
            .question('', function () {
                process.exit();
            });
    }


    compile() {
        const scenario = [
            new TruncateFileOperation(this._internalConfig.logFile),
            new ProxyTextThoughFileOperation(this._internalConfig.logFile, process.stdout),
            new TruncateFileOperation(this._internalConfig.errorFile),
            new ProxyTextThoughFileOperation(this._internalConfig.errorFile, process.stderr),
            new TruncateFileOperation(this._internalConfig.commandFile),
            new ProcessExternalCommandsOperation(this._internalConfig.commandFile),
            new ExecuteInteractiveCompilerOperation(this._internalConfig)
        ];

        scenario.forEach(function (operation) {
            operation.execute();
        });

        this._wait();
    }
}


module.exports = exports = FlaCompiler;