'use strict';

const fs = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;

const temp = require('temp');
temp.track();


class ExecuteInteractiveCompilerOperation {

    constructor(options) {
        this._options = options;
    }


    _generateCompilerConfiguration() {
        const localAutomationScriptsPath = temp.mkdirSync();
        fs.copySync(this._options.automationScriptsDirectory, localAutomationScriptsPath);

        const configurationFilePath = path.join(localAutomationScriptsPath, 'Parameters.json');
        fs.outputFileSync(configurationFilePath, JSON.stringify(this._options));

        const localBuildPlanPath = path.resolve(localAutomationScriptsPath, this._options.buildPlan);

        return [
            localBuildPlanPath
        ];
    };

    _executeCompiler(compilerOptions) {
        if (!this._options.debug) {
            spawn(this._options.interactiveCompiler, compilerOptions);
        }
        else {
            // Make sure Interactive Session Detection service is running.
            spawn('sc', ['start', 'ui0detect']);

            // Following hack will allow Interactive Session Detection service to capture launch of Adobe CC from Session 0.
            // When Interactive Session is detected, we can transition into Session 0 graphically to inspect whats going on there.
            spawn(
                'psexec', ['-i', '0',
                this._options.interactiveCompiler].concat(compilerOptions)); // Requesting Adobe CC to run in Session 0
        }
    };


    execute() {
        const compilerOptions = this._generateCompilerConfiguration();
        this._executeCompiler(compilerOptions);
    };
}


module.exports = exports = ExecuteInteractiveCompilerOperation;