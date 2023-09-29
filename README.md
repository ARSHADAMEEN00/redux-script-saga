# [Redux-Script](https://www.npmjs.com/package/redux-script?activeTab=readme)

Redux-Toolkit-Script is a package that generates code files for async API calls and Redux store slices based on the provided titles. It automates the process of creating Redux-related code, making it easier and more efficient to set up your Redux store.

## Installation

To install Redux-Script-Saga, use the following command:

## shell

```shell
npm install -g redux-script-saga
```

## Usage

1.  simply run the following command command:
    ```shell
    redux-script-saga Model_name
    ```
    This will execute the "index.js" file provided by Redux-Script-Saga, generating the necessary code files for async API calls and Redux store slices based on the titles you provide.

## you can also add the CURD inside the folder that already exist

redux-script-saga Model_name inside folder_name

```Example
 redux-script-saga Cart inside User
```

Make sure you have the required dependencies and configurations in place before running the Redux-Script-Saga command. Refer to the documentation or examples provided by Redux-Script-Saga for more details.

<hr />

### License

This project is licensed under the Apache-2.0 License. See the LICENSE file for details.

### Issues

If you encounter any issues or have any suggestions for improvement, please report them on the [issue tracker](https://github.com/ARSHADAMEEN00/redux-script-saga#readme)

### Contributing

Contributions are welcome! If you would like to contribute to Redux-Script-Saga, please follow the guidelines in the [CONTRIBUTING](https://github.com/ARSHADAMEEN00/redux-script-saga#readme) file.

### Acknowledgements

Special thanks to Ameen Arshad Nediya for creating and maintaining Redux-Script.

### Additional Resources

. [Documentation](https://www.npmjs.com/package/redux-script-saga?activeTab=readme)
. [GitHub Repository](https://github.com/ARSHADAMEEN00/redux-script-saga)

<hr />

### know more

to generate code files for async API calls and Redux store slices based on the provided titles. Let's break down the code and describe its function:

The script accepts command-line arguments to determine its behavior. It expects two arguments:

The first argument specifies the desired action. It can be "all" to run both functions (asyncApis and reduxStore), "api" to run asyncApis only, or "store" to run reduxStore only.
The second argument provides a comma-separated list of titles for file generation.
If an invalid command or no titles are provided, the script displays an error message and exits.

The script defines several code templates for generating async API-related code and Redux store code.

The asyncApis function generates code files for async API calls based on the provided titles:

For each title, it creates a file with the title as the name (e.g., "SomeTitle.js").
The file includes code templates for creating async thunk functions for CRUD operations (create, update, get, delete) related to the specified title.
The generated code includes API endpoints, error handling, and dispatching of relevant actions.
The reduxStore function generates code files for Redux store slices based on the provided titles:

For each title, it creates a file with the title converted to lowercase as the name (e.g., "sometitle.js").
The file includes code templates for defining a Redux store slice with initial state, reducers, and extra reducers for async API actions related to the specified title.
The writeFile function is a helper function used to write the generated code to the appropriate file. It handles file creation or replacement depending on whether the file already exists.

The createFolderIfNotExists function is another helper function used to create necessary folders for the generated files.

The createFoldersAndFiles function is the main entry point of the script:

It checks the provided command and executes the corresponding functions
(asyncApis, reduxStore, or both) based on the command-line arguments.
It also handles folder creation and displays success or error messages for each generated file.
Overall, this script provides a convenient way to generate code files for async API calls and Redux store slices based on the provided titles. It automates the process of creating boilerplate code for common operations and can save time when setting up API integration and Redux state management in a project
