// start
const fs = require("fs");
const templates = require("./Templates/templates");

const createFolderIfNotExists = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.warn(`Folder created: ${folderPath}`);
  } else {
    console.warn(`Folder already exists: ${folderPath}`);
  }
};

const createOrUpdateFile = (fileName, code) => {
  if (fs.existsSync(fileName)) {
    fs.writeFileSync(fileName, code, { flag: "w" });
    console.log(`File replaced: ${fileName}`);
  } else {
    fs.writeFileSync(fileName, code);
    console.log(`File created: ${fileName}`);
  }
};

const appendToFile = (fileName, code) => {
  if (fs.existsSync(fileName)) {
    fs.appendFileSync(fileName, code);
    console.log(`Content added to ${fileName}`);
  } else {
    fs.writeFileSync(fileName, code);
    console.log(`File created: ${fileName}`);
  }
};

function appendContentToFile(filePath, contentToAdd, checkString) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    if (fileContent.includes(checkString)) {
      console.log(`Content already exists in the file. ${filePath}`);
    } else {
      fs.appendFileSync(filePath, contentToAdd);
      console.log(`Content added to the file ${filePath}`);
    }
  } catch (err) {
    console.error(`Error appending content to file: ${err.message}`);
  }
}

function appendToFileMiddleware(filePath, checkString, statement) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${filePath}: ${err.message}`);
      return;
    }
    // Check if the import statement already exists
    if (data?.includes(checkString)) {
      console.log(`Import already exists in ${filePath}`);
    } else {
      // Append the import statement to the file
      appendToFile(filePath, statement);
    }
  });
}

function updateReducers(modelName) {
  modelName?.map((name) => {
    const filePath = `src/store/reducers.js`;
    const importLine = `//${name?.toLowerCase()}\nimport ${name} from "./${name?.toLowerCase()}/reducer"`;
    const checkString = `import ${name} from "./${name?.toLowerCase()}/reducer"`;

    if (fs.existsSync(filePath)) {
      console.log(`Data: OK`);
      let fileContents = fs.readFileSync(filePath, "utf-8");

      if (fileContents?.includes(checkString)) {
        console.log(`${checkString} already exists in ${filePath}`);
      } else {
        console.log(`Creating a new import for ${name} in ${filePath}`);
        if (fileContents.includes("export default rootReducer")) {
          fileContents = fileContents.replace(
            /export default rootReducer = combineReducers\({/,
            `${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name},`
          );

          fs.writeFileSync(filePath, fileContents);
        } else {
          fs.writeFileSync(
            filePath,
            `import { combineReducers } from 'redux';\n${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name}\n});\n`
          );
        }
      }
    } else {
      console.log(`Creating a new file: ${filePath}`);
      fs.writeFileSync(
        filePath,
        `import { combineReducers } from 'redux';\n${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name}\n});\n`
      );
    }
  });
}

function updateAction(modelName) {
  modelName?.map((name) => {
    const filePath = "src/store/actions.js";
    const checkString = `export * from "./${name?.toLowerCase()}/actions";`;
    const statement = `\n//${name}
    export * from "./${name?.toLowerCase()}/actions"`;

    if (fs.existsSync(filePath)) {
      appendToFileMiddleware(filePath, checkString, statement);
    } else {
      fs.writeFileSync(filePath, statement);
    }
  });
}

function updateSaga(modelName) {
  modelName?.map((name) => {
    const filePath = "src/store/sagas.js";
    const importLine = `import ${name}Saga from "./${name?.toLowerCase()}/saga"`;

    if (fs.existsSync(filePath)) {
      let fileContents = fs.readFileSync(filePath, "utf-8");

      if (fileContents?.includes(importLine)) {
        console.log(`${importLine} already exists in ${filePath}`);
      } else {
        if (fileContents?.includes("yield all([")) {
          fileContents = fileContents
            .replace(
              "export default function* rootSaga() {",
              `${importLine}\n\nexport default function* rootSaga() {`
            )
            .replace("yield all([", `yield all([\nfork(${name}Saga),`);

          fs.writeFileSync(filePath, fileContents);
        } else {
          fs.writeFileSync(
            filePath,
            `import { all, fork } from "redux-saga/effects";\n${importLine}\n\nexport default function* rootSaga() {\nyield all([\n fork(${name}Saga),\n ])\n}`
          );
        }
      }
    } else {
      fs.writeFileSync(
        filePath,
        `import { all, fork } from "redux-saga/effects";\n${importLine}\n\nexport default function* rootSaga() {\nyield all([\n fork(${name}Saga),\n ])\n}`
      );
    }
  });
}

const reduxStore = (modelName) => {
  createOrUpdateFile(`src/store/index.js`, templates?.reduxIndexTemplate);
  updateReducers(modelName);
  updateAction(modelName);
  updateSaga(modelName);
};

const actionTypes = (modelName, folderName) => {
  if (folderName) {
    const filePath = `src/store/${folderName?.toLowerCase()}/actionTypes.js`;
    const checkString = `/* ${modelName}s - This line cannot be edited or removed */`;

    modelName?.map((name) => {
      appendContentToFile(
        filePath,
        templates.actionTypesTemplate(name),
        checkString
      );
    });
  } else {
    modelName?.map((name) => {
      const path = `src/store/${name?.toLowerCase()}/actionTypes.js`;
      createOrUpdateFile(path, templates.actionTypesTemplate(name));
    });
  }
};

const action = (modelName, folderName) => {
  if (folderName) {
    const filePath = `src/store/${folderName?.toLowerCase()}/actions.js`;
    const checkString = `// ${modelName} - This line cannot be edited or removed`;

    modelName?.map((name) => {
      appendContentToFile(
        filePath,
        templates.actionCreatorsTemplate(name),
        checkString
      );
    });
  } else {
    modelName?.map((name) => {
      const path = `src/store/${name?.toLowerCase()}/actions.js`;
      createOrUpdateFile(path, templates.actionCreatorsTemplate(name));
    });
  }
};

const reducer = (modelName, folderName) => {
  if (folderName) {
    const filePath = `src/store/${folderName?.toLowerCase()}/reducer.js`;
    const checkString = `// ${modelName} - This line cannot be edited or removed`;

    modelName?.map((name) => {
      try {
        let fileContent = fs.readFileSync(filePath, "utf-8");

        if (fileContent?.includes(checkString)) {
          console.log(`Content already exists in the file. ${filePath}`);
        } else {
          const { importSection, reducerSection, stateSection } =
            templates.reducerTemplateBundle(name);

          const updates = [
            {
              pattern: /} from "\.\/actionTypes";/,
              replacement: `${importSection}\n} from "./actionTypes";`,
            },
            {
              pattern: /const INIT_STATE = {/,
              replacement: `const INIT_STATE = {\n${stateSection}`,
            },
            {
              pattern: /default:/,
              replacement: `\n${reducerSection} \ndefault:`,
            },
          ];

          for (const { pattern, replacement } of updates) {
            fileContent = fileContent.replace(pattern, replacement);
          }

          fs.writeFileSync(filePath, fileContent);
          console.log(`Content added to the file ${filePath}`);
        }
      } catch (err) {
        console.error(`Error appending content to file: ${err.message}`);
      }
    });
  } else {
    modelName?.map((name) => {
      const path = `src/store/${name?.toLowerCase()}/reducer.js`;
      createOrUpdateFile(path, templates.reducerTemplate(name));
    });
  }
};

const saga = (modelName, folderName) => {
  if (folderName) {
    const filePath = `src/store/${folderName?.toLowerCase()}/saga.js`;
    const checkString = `// ${modelName} - This line cannot be edited or removed`;

    modelName?.map((name) => {
      try {
        let fileContent = fs.readFileSync(filePath, "utf-8");

        if (fileContent?.includes(checkString)) {
          console.log(`Content already exists in the file. ${filePath}`);
        } else {
          const {
            importSection,
            importActionSection,
            sagaContent,
            sagaExport,
          } = templates.sagaTemplateBundle(name);

          const updates = [
            {
              pattern: /} from "\.\/actionTypes";/,
              replacement: `${importSection}\n} from "./actionTypes";`,
            },
            {
              pattern: /} from "\.\/actions";/,
              replacement: `${importActionSection}\n} from "./actions";`,
            },
            {
              pattern: `function* ${folderName}Saga() {`,
              replacement: `${sagaContent} \nfunction* ${folderName}Saga() { \n ${sagaExport}`,
            },
          ];

          for (const { pattern, replacement } of updates) {
            fileContent = fileContent.replace(pattern, replacement);
          }

          fs.writeFileSync(filePath, fileContent);
          console.log(`Content added to the file ${filePath}`);
        }
      } catch (err) {
        console.error(`Error appending content to file: ${err.message}`);
      }
    });
  } else {
    modelName?.map((name) => {
      const path = `src/store/${name?.toLowerCase()}/saga.js`;
      createOrUpdateFile(path, templates.sagaTemplate(name));
    });
  }
};

// package handler
function generateFiles(modelName, isInSameFolder, folderName) {
  createFolderIfNotExists("src");
  createFolderIfNotExists("src/store");

  if (isInSameFolder === "inside") {
    actionTypes(modelName, folderName);
    action(modelName, folderName);
    reducer(modelName, folderName);
    saga(modelName, folderName);
  } else {
    createFolderIfNotExists(`src/store/${modelName[0]?.toLowerCase()}`);
    reduxStore(modelName);

    actionTypes(modelName);
    action(modelName);
    reducer(modelName);
    saga(modelName);
  }

  console.log("Happy Hacking! 🔥 by AM - Osperb");
}

module.exports = { generateFiles };
