'use strict';

const fs = require('fs');


class TruncateFileOperation {

    constructor(file) {
        this._file = file;
    }


    execute() {
        if (!fs.existsSync(this._file)) {
            return;
        }

        const fileDescriptor = fs.openSync(this._file, 'w+');
        fs.closeSync(fileDescriptor);
    }
}


module.exports = exports = TruncateFileOperation;