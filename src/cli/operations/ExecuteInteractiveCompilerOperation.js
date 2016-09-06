'use strict';

const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;


class ExecuteInteractiveCompilerOperation {

    constructor(options) {
        this._options = options;
    }


    _generateCompilerConfiguration() {
        const planPathComponents = path.parse(this._options.buildPlan);

        const configurationFilePath = path.join(
            planPathComponents.dir,
            planPathComponents.name + '.Parameters.json');

        fs.writeFileSync(configurationFilePath, JSON.stringify(this._options));
    };

    _executeCompiler() {
        if (!this._options.debug) {
            spawn(this._options.interactiveCompiler, [this._options.buildPlan]);
        }
        else {
            // Make sure Interactive Session Detection service is running.
            spawn('sc', ['start', 'ui0detect']);

            // Following hack will allow Interactive Session Detection service to capture launch of Adobe CC from Session 0.
            // When Interactive Session is detected, we can transition into Session 0 graphically to inspect whats going on there.
            spawn(
                'psexec', ['-i', '0',
                this._options.interactiveCompiler, this._options.buildPlan]); // Requesting Adobe CC to run in Session 0
        }
    };


    execute() {
        this._generateCompilerConfiguration();
        this._executeCompiler();
    };
}


module.exports = exports = ExecuteInteractiveCompilerOperation;