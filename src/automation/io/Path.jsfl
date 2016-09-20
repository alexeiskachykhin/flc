'use strict';

var Path = new function () {

    var self = this;

    var PLATFORM_SPECIFIC_SEPARATOR = (FLfile.uriToPlatformPath(fl.scriptURI).indexOf('\\') !== -1)
        ? '\\'
        : '/';

    var possibleSeparators = [
        '\\',
        '/'
    ];


    self._normalize = function (path) {
        var normalizedPath = path;

        possibleSeparators.forEach(function (separator) {
            normalizedPath = normalizedPath.split(separator).join(PLATFORM_SPECIFIC_SEPARATOR);
        });

        if (normalizedPath[0] === PLATFORM_SPECIFIC_SEPARATOR) {
            normalizedPath = normalizedPath.slice(1);
        }

        if (normalizedPath[normalizedPath.length - 1] === PLATFORM_SPECIFIC_SEPARATOR) {
            normalizedPath = normalizedPath.slice(0, -1);
        }

        return normalizedPath;
    };

    self.combine = function (a, b) {
        var combinedPath =
            self._normalize(a) +
            PLATFORM_SPECIFIC_SEPARATOR +
            self._normalize(b);

        return combinedPath;
    };

    self.basename = function (path, extension) {
        var normalizedPath = self._normalize(path);
        var normalizedPathParts = normalizedPath.split(PLATFORM_SPECIFIC_SEPARATOR);

        var basename = normalizedPathParts[normalizedPathParts.length - 1];

        if (!extension) {
            return basename;
        }

        if (basename.slice(-extension.length) === extension) {
            basename = basename.slice(0, -extension.length)
        }

        return basename;
    };


    return self;
}
