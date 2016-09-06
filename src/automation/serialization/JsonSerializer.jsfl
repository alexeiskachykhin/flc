'use strict';

var JsonSerializer = new function () {

    var self = this;


    self.deserialize = function (fileUri) {
        var json = FLfile.read(fileUri);

        // It should be relatively safe to parse json with eval since we are working in constrained envrionment.
        // Alternative would be to bring full-fledged library, which can be done later.
        var object = eval('(' + json + ')');

        return object;
    };


    return self;
};