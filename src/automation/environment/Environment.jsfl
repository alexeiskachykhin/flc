'use strict';

function Environment(scriptUri) {

    var self = this;


    self.scriptUri = scriptUri;
    self.scriptUriParts = self.scriptUri.split('/');
    self.scriptName = self.scriptUriParts[self.scriptUriParts.length - 1];
    self.scriptDirectoryUri = self.scriptUri.split('/' + self.scriptName)[0];


    return self;
};

