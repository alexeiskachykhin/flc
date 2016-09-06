'use strict';


class ShutdownCommand {

    execute(parameters) {
        const exitCode = parameters[0];
        console.log('FLA compiler is shutting down with status code ' + exitCode);

        process.exit(exitCode);
    }


    static get permanentName() {
        return 'Shutdown';
    }
}


module.exports = exports = ShutdownCommand;
