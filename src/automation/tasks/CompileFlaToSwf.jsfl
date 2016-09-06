'use strict';

function CompileFlaToSwfTask(inputFileUri, outputDirectoryUri) {

    var self = this;


    // TODO: Blacklist should not be hardcoded.
    var _blacklist = [];


    self._composeOutputFileUri = function (document, outputDirectoryUri) {
        var puslishProfile = document.exportPublishProfileString('Default');
        var publishProfileDOM = new XML(puslishProfile);

        var outputFilePath = Path.combine(
            FLfile.uriToPlatformPath(outputDirectoryUri),
            Path.basename(publishProfileDOM.PublishFormatProperties.flashFileName.toString())
        );

        var outputFileUri = FLfile.platformPathToURI(outputFilePath);

        return outputFileUri;
    };

    self._ensureOuputDirectoryExists = function (outputDirectoryUri) {
        FLfile.createFolder(outputDirectoryUri);
    };

    self._getCompilerOutput = function () {
        var logFileUri = outputDirectoryUri + '/temp.log';

        fl.compilerErrors.save(logFileUri);
        var outputText = FLfile.read(logFileUri);
        FLfile.remove(logFileUri);

        return outputText;
    };

    self._hasCompilerErrors = function () {
        var outputText = self._getCompilerOutput();
        var hasErrors = (outputText.match(/\*\*Error\*\*/g) !== null);

        return hasErrors;
    };

    self._isBlacklisted = function () {
        var isBlacklisted = _blacklist.some(function (blacklistEntry) {
            return (inputFileUri.indexOf(blacklistEntry) !== -1);
        });

        return isBlacklisted;
    };


    self.execute = function () {
        var status;

        if (self._isBlacklisted()) {
            status = BuildTaskStatus.SKIPPED;
        }
        else {
            var document = fl.openDocument(inputFileUri);

            var outputFileUri = self._composeOutputFileUri(document, outputDirectoryUri);
            self._ensureOuputDirectoryExists(outputDirectoryUri);

            document.exportSWF(outputFileUri, true);

            status = self._hasCompilerErrors() ?
                BuildTaskStatus.FAILED :
                BuildTaskStatus.OK;

            Console.log(self._getCompilerOutput());

            fl.closeDocument(document, false);
        }

        Console.log(' >>>>> ' +
            (status === BuildTaskStatus.OK ? 'succeeded' : '') +
            (status === BuildTaskStatus.FAILED ? 'failed' : '') +
            (status === BuildTaskStatus.SKIPPED ? 'skipped' : '') +
            '\n');

        return status;
    };


    return self;
}