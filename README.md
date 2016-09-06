# flc

Flc is a command line interface for Adobe Flash Professional. It is usefull when you need to drive Adobe Flash Professional on Continious Integration server. Under the hood it supplies set of __jsfl__ files to Adobe Flash Professional to execute. Flc is capable of writing status information to stdout and shutdowns with proper exit code which is important for automation scenarios.

## How to install

Npm package is comming soon. For now you can install it directly from GitHub:

```
npm install -g alexeiskachykhin/flc
```

## How to use

Following command will build FLAs from "c:\fla" and put SWFs to "c:\swf":

```
flc --interactiveCompiler "c:\Program Files\Adobe\Adobe Flash CC 2014\Flash.exe" \
    --inputDirectory "c:\fla" \ 
    --outputDirectory "c:\swf" \
    --includePattern="*.fla"
```

You help to get a list of all available options

```
flc --help
```

## Continious Integration

As __flc__ drives UI of Adobe Flash Professional it is really important that no unexpected dialogs show up in the middle of compilation process. __jsfl__ scripting capabilities are very limited so you should take responsibility to configure Adobe Flash Professional accordingly.

It might be challenging because certain Continious Integration servers execute tasks under Session 0 Desktop, which means that UI of Adobe Flash Professional is not visible by default so you can't see whats going in with it in the middle of compilation process. In order to see it, make sure that:

1. __flc__ is being run with `--debug=true`
2. you have __psexec__ installed
 
Then RDP into machine that executes __flc__ and run following command:

```
psexec -i 0 cmd
```

Once it is executed you will see a message from [Interactive Session Detection Service](https://blogs.msdn.microsoft.com/patricka/2010/04/27/what-is-interactive-services-detection-and-why-is-it-blinking-at-me/) that allows to transition graphically into Session 0 Desktop and see whats goint on.
