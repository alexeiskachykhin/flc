'use strict';

var Console = new function () {

    var self = this;

    var _cliClient = null;


    self._ensureNewLine = function (text) {
        return (text + '\n');
    };


    self.init = function (cliClient) {
        _cliClient = cliClient;
    };

    self.log = function (text) {
        _cliClient.log(self._ensureNewLine(text));
    };

    self.error = function (text) {
        _cliClient.error(self._ensureNewLine(text));
    };


    return self;
};