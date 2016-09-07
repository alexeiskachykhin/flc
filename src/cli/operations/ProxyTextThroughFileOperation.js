'use strict';

const GrowingFile = require('growing-file');


class ProxyTextThroughFileOperation {

    constructor(inputFile, outputStream) {
        this._inputFile = inputFile;
        this._outputStream = outputStream;
    }


    execute() {
        // TODO: Growing file is constantly polling a file for modifications. It should be rewritten
        // into FileSystemWatcher to prevent EBUSY errors.
        const fileStream = GrowingFile.open(this._inputFile, {
            timeout: Number.MAX_VALUE,
            interval: 1000
        });

        fileStream.pipe(this._outputStream);
    }
}


module.exports = exports = ProxyTextThroughFileOperation;