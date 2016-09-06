# flc

Flc is a command line interface for Adobe Flash Professional. It is usefull when you need to drive Adobe Flash Professional on Continious Integration server. Under the hood it supplies set of __jsfl__ files to Adobe Flash Professional to execute. Flc is capable of writing status information to stdout and shutsdown with proper exit code which is important for automation scenarios.

## How to install

Npm package is comming soon. For now you can install it directly from GitHub:

```
npm install -g alexeiskachykhin/flc
```

## How to use

Following command will build as FLAs from "c:\fla" and put SWFs to "c:\swf":

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