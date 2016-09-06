'use strict';

function CompileMultipleFlaToSwfTask(inputDirectoryUri, outputDirectoryUri, includePattern) {

    var self = this;


    self.execute = function () {
        var files = Directory.findFiles(inputDirectoryUri, includePattern);

        var tasks = files.map(function (file) {
            return new CompileFlaToSwfTask(file, outputDirectoryUri);
        });


        Console.log('Found ' + files.length + ' files matching include pattern ' + includePattern);


        var statuses = tasks.map(function (task, index) {
            Console.log('Compiling (' + (index + 1) + ' out of ' + files.length + '): ' + files[index]);
            return task.execute();
        });

        var status = (statuses.indexOf(BuildTaskStatus.FAILED) === -1) ?
            BuildTaskStatus.OK :
            BuildTaskStatus.FAILED;

        return status;
    };


    return self;
}