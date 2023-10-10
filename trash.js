// const reduxStoreDefault = (modelName) => {
//   //index.js
//   createOrUpdateFile(`src/store/index.js`, templates.reduxIndexTemplate);

//   // actions.js
//   modelName?.map((name) => {
//     const filePath = "src/store/actions.js";
//     const checkString = `export * from "./${name?.toLowerCase()}/actions";`;
//     const statement = `\n//${name}
//     export * from "./${name?.toLowerCase()}/actions"`;

//     if (fs.existsSync(filePath)) {
//       appendToFileMiddleware(filePath, checkString, statement);
//     } else {
//       fs.writeFileSync(filePath, statement);
//     }
//   });

//   // reducers.js
//   modelName?.map((name) => {
//     const filePath = "src/store/reducers.js";
//     const importLine = `//${name?.toLowerCase()}\nimport ${name} from "./${name?.toLowerCase()}/reducer"`;
//     const checkString = `import ${name} from "./${name?.toLowerCase()}/reducer"`;

//     if (fs.existsSync(filePath)) {
//       let fileContents = fs.readFileSync(filePath, "utf-8");

//       if (fileContents.includes(checkString)) {
//         console.log(`${checkString} already exists in ${filePath}`);
//       } else {
//         if (fileContents.includes("export default rootReducer")) {
//           fileContents = fileContents.replace(
//             /export default rootReducer = combineReducers\({/,
//             `${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name},`
//           );

//           fs.writeFileSync(filePath, fileContents);
//         } else {
//           fs.writeFileSync(
//             filePath,
//             `import { combineReducers } from 'redux';\n${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name}\n});\n`
//           );
//         }
//       }
//     } else {
//       fs.writeFileSync(
//         filePath,
//         `import { combineReducers } from 'redux';\n${importLine}\n\nexport default rootReducer = combineReducers({\n  ${name}\n});\n`
//       );
//     }
//   });

//   // sagas.js
//   modelName?.map((name) => {
//     const filePath = "src/store/sagas.js";
//     const importLine = `import ${name}Saga from "./${name?.toLowerCase()}/saga"`;

//     if (fs.existsSync(filePath)) {
//       let fileContents = fs.readFileSync(filePath, "utf-8");

//       if (fileContents?.includes(importLine)) {
//         console.log(`${importLine} already exists in ${filePath}`);
//       } else {
//         if (fileContents?.includes("yield all([")) {
//           fileContents = fileContents
//             .replace(
//               "export default function* rootSaga() {",
//               `${importLine}\n\nexport default function* rootSaga() {`
//             )
//             .replace("yield all([", `yield all([\nfork(${name}Saga),`);

//           fs.writeFileSync(filePath, fileContents);
//         } else {
//           fs.writeFileSync(
//             filePath,
//             `import { all, fork } from "redux-saga/effects";\n${importLine}\n\nexport default function* rootSaga() {\nyield all([\n fork(${name}Saga),\n ])\n}`
//           );
//         }
//       }
//     } else {
//       fs.writeFileSync(
//         filePath,
//         `import { all, fork } from "redux-saga/effects";\n${importLine}\n\nexport default function* rootSaga() {\nyield all([\n fork(${name}Saga),\n ])\n}`
//       );
//     }
//   });
// };
