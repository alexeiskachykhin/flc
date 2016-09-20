'use strict';

function importScript(filePath) {
    var scriptPath = FLfile.uriToPlatformPath(fl.scriptURI);
    var scriptPathEnd = scriptPath.lastIndexOf('\\');
    if (scriptPathEnd === -1) {
        scriptPathEnd = scriptPath.lastIndexOf('/');
    }
    scriptPath = scriptPath.slice(0, scriptPathEnd + 1);
    fl.runScript(FLfile.platformPathToURI(scriptPath + filePath));
}

importScript('../communication/CliClient.jsfl');
importScript('../diagnostics/Console.jsfl');
importScript('../environment/Environment.jsfl');
importScript('../serialization/JsonSerializer.jsfl');
importScript('../io/Glob.jsfl');
importScript('../io/Path.jsfl');
importScript('../io/Directory.jsfl');
importScript('../tasks/BuildTaskStatus.jsfl');
importScript('../tasks/CompileFlaToSwf.jsfl');
importScript('../tasks/CompileMultipleFlaToSwfTask.jsfl');


var environment = new Environment(fl.scriptURI);

var config = JsonSerializer.deserialize(
    environment.scriptDirectoryUri + '/' +
    Path.basename(environment.scriptName, '.jsfl') + '.Parameters.json');


var cliClient = new CliClient(
    FLfile.platformPathToURI(config.logFile),
    FLfile.platformPathToURI(config.errorFile),
    FLfile.platformPathToURI(config.commandFile)
);

Console.init(cliClient);


var task = new CompileMultipleFlaToSwfTask(
    FLfile.platformPathToURI(config.inputDirectory),
    FLfile.platformPathToURI(config.outputDirectory),
    config.includePattern
);

var status = task.execute();

cliClient.shutdown(status === BuildTaskStatus.FAILED ? 1 : 0);
fl.quit(false);