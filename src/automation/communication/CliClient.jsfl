'use stirct';

function CliClient(logFileUri, errorFileUri, commandFileUri) {

    var self = this;


    self._sendCommand = function (command, parameters) {
        var commandString = command + ',' + parameters.toString();
        FLfile.write(commandFileUri, commandString + '\n', 'append');
    };


    self.log = function (text) {
        FLfile.write(logFileUri, text, 'append');
    };

    self.error = function (text) {
        FLfile.write(errorFileUri, text, 'append');
    };

    self.shutdown = function (exitCode) {
        self._sendCommand('Shutdown', [exitCode]);
    };


    return self;
}