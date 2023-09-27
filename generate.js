// start
const fs = require("fs");

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

const reduxStoreDefault = (modelName) => {
  //index.js
  const index = `import { createStore, applyMiddleware, compose } from "redux"
  import createSagaMiddleware from "redux-saga"
  
  import rootReducer from "./reducers"
  import rootSaga from "./sagas"
  
  const sagaMiddleware = createSagaMiddleware()
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  
  sagaMiddleware.run(rootSaga)
  
  export default store
  `;
  createOrUpdateFile(`src/store/index.js`, index);

  // actions.js
  modelName?.map((name) => {
    const action = `\n//${name}
    export * from "./${name?.toLowerCase()}/actions"`;
    return appendToFile(`src/store/actions.js`, action);
  });

  // reducers.js
  modelName?.map((name) => {
    const importLine = `//${name?.toLowerCase()}\nimport ${name} from "${name?.toLowerCase()}/reducer"`;
    const filePath = "src/store/reducers.js";

    if (fs.existsSync(filePath)) {
      let fileContents = fs.readFileSync(filePath, "utf-8");

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
    } else {
      fs.writeFileSync(
        filePath,
        `import { combineReducers } from 'redux';\n${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name}\n});\n`
      );
    }
  });

  // sagas.js
  modelName?.map((name) => {
    const importLine = `import ${name}Saga from "${name?.toLowerCase()}/saga"`;
    const filePath = "src/store/sagas.js";

    if (fs.existsSync(filePath)) {
      let fileContents = fs.readFileSync(filePath, "utf-8");

      if (fileContents.includes("yield all([")) {
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
    } else {
      fs.writeFileSync(
        filePath,
        `import { all, fork } from "redux-saga/effects";\n${importLine}\n\nexport default function* rootSaga() {\nyield all([\n fork(${name}Saga),\n ])\n}`
      );
    }
  });
};

const reduxStore = (modelName) => {
  reduxStoreDefault(modelName);
};

// package handler
function generateFiles(modelName) {
  // Create folders
  createFolderIfNotExists("src");
  createFolderIfNotExists("src/store");
  createFolderIfNotExists(`src/store/${modelName}`);

  reduxStore(modelName);

  console.log("Happy Hacking! 🔥 Osperb");
}

module.exports = { generateFiles };

// const createOrUpdateFile = (filePath, newContent) => {
//   let existingContent = "";

//   if (fs.existsSync(filePath)) {
//     existingContent = fs.readFileSync(filePath, "utf8");
//   }

//   if (existingContent !== newContent) {
//     const updatedContent = existingContent + "\n" + newContent;
//     fs.writeFileSync(filePath, updatedContent);
//     console.log(`File updated: ${filePath}`);
//   } else {
//     console.log(`File content is already up-to-date: ${filePath}`);
//   }
// };
