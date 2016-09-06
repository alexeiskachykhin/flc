'use strict';

var Directory = new function () {

    var self = this;


    var PATTERN_SEPARATOR = ';';


    self._findFilesByPattern = function (rootUri, directoryUri, pattern) {
        var files = FLfile.listFolder(directoryUri, 'files');

        files = files.map(function (file) {
            return (directoryUri + '/' + file);
        });

        files = files.filter(function (file) {
            var glob = new Glob(pattern);

            // Converting absolute uri to relative to avoid globbing on portion of the path that
            // developer doesn't control. Like checkout folder on CI server.
            var relativeFileUri = file.replace(rootUri, '');

            return glob.matchString(relativeFileUri);
        });


        var subDirectories = FLfile.listFolder(directoryUri, 'directories');

        subDirectories.forEach(function (subDirectory) {
            files.push.apply(files, self._findFilesByPattern(rootUri, directoryUri + '/' + subDirectory, pattern));
        });


        return files;
    };


    self.findFiles = function (directoryUri, multiPattern) {
        var files = [];

        var patterns = multiPattern.split(PATTERN_SEPARATOR);

        patterns.forEach(function (pattern) {
            var filesMatchedByPattern = self._findFilesByPattern(directoryUri, directoryUri, pattern);
            files.push.apply(files, filesMatchedByPattern);
        });

        return files;
    };


    return self;
}();