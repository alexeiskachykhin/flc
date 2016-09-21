'use strict';

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');


class TruncateFileOperation {

    constructor(file) {
        this._file = file;
    }


    execute() {
        const directoryPath = path.dirname(this._file);
        mkdirp.sync(directoryPath);

        const fileDescriptor = fs.openSync(this._file, 'w+');
        fs.closeSync(fileDescriptor);
    }
}


module.exports = exports = TruncateFileOperation;