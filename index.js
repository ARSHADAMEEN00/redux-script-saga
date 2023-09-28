#!/usr/bin/env node

const generateFiles = require("./generate").generateFiles;
const fs = require("fs");
const path = require("path");

console.log("data :", process.argv);

const titlesFromCommand = process.argv[2];
const modelNames = titlesFromCommand?.split(",");
const isInSameFolder = process.argv[3];
const folderName = process.argv[4];

if (!titlesFromCommand) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Please provide model names for file generation."
  );

  process.exit(1);
}

if (modelNames.length > 1) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Please provide only one model name at a time for file generation."
  );
  process.exit(1);
}

if (
  modelNames.some((name) => name.charAt(0) !== name.charAt(0).toUpperCase())
) {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Model names should start with a capital letter."
  );
  process.exit(1);
}

if (folderName) {
  if (/[A-Z]/.test(folderName)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "folder names should not contain any capital letters."
    );
    process.exit(1);
  }

  const folderPath = path.join("src", "store", folderName);

  if (!fs.existsSync(folderPath)) {
    console.error(
      "\x1b[31m%s\x1b[0m",
      `The folder '${folderName}' does not exist in 'src/store'. please create the folder, run redux-script-saga ${folderName}`
    );
    process.exit(1);
  }
}

if (process.argv.length > 2) {
  generateFiles(modelNames, isInSameFolder, folderName);
  // modelNames?.map((name) => generateFiles(modelNames));
} else {
  console.error("Please provide a model name as a command line argument.");
  process.exit(1);
}
