'use strict';

const fs = require('fs-extra');


class TruncateFileOperation {

    constructor(file) {
        this._file = file;
    }


    execute() {
        fs.outputFileSync(this._file, '', {
            flag: 'w+'
        });
    }
}


module.exports = exports = TruncateFileOperation;