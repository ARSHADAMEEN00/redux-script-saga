#!/usr/bin/env node

const generateFiles = require("./generate").generateFiles;

const titlesFromCommand = process.argv[2];
const modelNames = titlesFromCommand?.split(",");

console.log(modelNames);

if (!titlesFromCommand) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Please provide model names for file generation."
  );

  process.exit(1);
}

if (process.argv.length > 2) {
  generateFiles(modelNames);
  // modelNames?.map((name) => generateFiles(modelNames));
} else {
  console.error("Please provide a model name as a command line argument.");
  process.exit(1);
}
