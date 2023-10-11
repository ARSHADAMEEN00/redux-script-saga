const reduxIndexTemplate = `import { createStore, applyMiddleware, compose } from "redux"
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

const actionTypesTemplate = (name) => `
/* ${name}s - This line cannot be edited or removed */
export const GET_${name?.toUpperCase()}S = 'GET_${name?.toUpperCase()}S';
export const GET_${name?.toUpperCase()}S_SUCCESS = 'GET_${name?.toUpperCase()}S_SUCCESS';
export const GET_${name?.toUpperCase()}S_FAIL = 'GET_${name?.toUpperCase()}S_FAIL';

/* ${name}_DETAILS */
export const GET_${name?.toUpperCase()}_DETAILS = 'GET_${name?.toUpperCase()}_DETAILS';
export const GET_${name?.toUpperCase()}_DETAILS_SUCCESS = 'GET_${name?.toUpperCase()}_DETAILS_SUCCESS';
export const GET_${name?.toUpperCase()}_DETAILS_FAIL = 'GET_${name?.toUpperCase()}_DETAILS_FAIL';

/* CREATE ${name} */
export const CREATE_${name?.toUpperCase()} = 'CREATE_${name?.toUpperCase()}';
export const CREATE_${name?.toUpperCase()}_SUCCESS = 'CREATE_${name?.toUpperCase()}_SUCCESS';
export const CREATE_${name?.toUpperCase()}_FAIL = 'CREATE_${name?.toUpperCase()}_FAIL';

/* Edit ${name} */
export const UPDATE_${name?.toUpperCase()} = 'UPDATE_${name?.toUpperCase()}';
export const UPDATE_${name?.toUpperCase()}_SUCCESS = 'UPDATE_${name?.toUpperCase()}_SUCCESS';
export const UPDATE_${name?.toUpperCase()}_FAIL = 'UPDATE_${name?.toUpperCase()}_FAIL';

/* Delete ${name} */
export const DELETE_${name?.toUpperCase()} = 'DELETE_${name?.toUpperCase()}';
export const DELETE_${name?.toUpperCase()}_SUCCESS = 'DELETE_${name?.toUpperCase()}_SUCCESS';
export const DELETE_${name?.toUpperCase()}_FAIL = 'DELETE_${name?.toUpperCase()}_FAIL';
`;

const actionCreatorsTemplate = (name) => `
  import {
    GET_${name?.toUpperCase()}S,
    GET_${name?.toUpperCase()}S_SUCCESS,
    GET_${name?.toUpperCase()}S_FAIL,
    GET_${name?.toUpperCase()}_DETAILS,
    GET_${name?.toUpperCase()}_DETAILS_SUCCESS,
    GET_${name?.toUpperCase()}_DETAILS_FAIL,
    CREATE_${name?.toUpperCase()},
    CREATE_${name?.toUpperCase()}_SUCCESS,
    CREATE_${name?.toUpperCase()}_FAIL,
    UPDATE_${name?.toUpperCase()},
    UPDATE_${name?.toUpperCase()}_SUCCESS,
    UPDATE_${name?.toUpperCase()}_FAIL,
    DELETE_${name?.toUpperCase()}_SUCCESS,
    DELETE_${name?.toUpperCase()}_FAIL,
    DELETE_${name?.toUpperCase()},
  } from "./actionTypes";


  // ${name} - This line cannot be edited or removed
  export const get${name}s = (page, sort, limit, searchText) => ({
    type: GET_${name?.toUpperCase()}S,
    payload: { page, sort, limit, searchText },
  });
  
  export const get${name}sSuccess = (${name?.toLowerCase()}s) => ({
    type: GET_${name?.toUpperCase()}S_SUCCESS,
    payload: ${name?.toLowerCase()}s,
  });
  
  export const get${name}sFail = (error) => ({
    type: GET_${name?.toUpperCase()}S_FAIL,
    payload: error,
  });
  
  export const get${name}Details = (${name?.toLowerCase()}Id) => ({
    type: GET_${name?.toUpperCase()}_DETAILS,
    payload: ${name?.toLowerCase()}Id,
  });
  
  export const get${name}DetailsSuccess = (${name?.toLowerCase()}Details) => ({
    type: GET_${name?.toUpperCase()}_DETAILS_SUCCESS,
    payload: ${name?.toLowerCase()}Details,
  });
  
  export const get${name}DetailsFail = (error) => ({
    type: GET_${name?.toUpperCase()}_DETAILS_FAIL,
    payload: error,
  });
  
  export const create${name} = (${name?.toLowerCase()}, history) => ({
    type: CREATE_${name?.toUpperCase()},
    payload: { ${name?.toLowerCase()}, history },
  });
  
  export const create${name}Success = (${name?.toLowerCase()}) => ({
    type: CREATE_${name?.toUpperCase()}_SUCCESS,
    payload: ${name?.toLowerCase()},
  });
  
  export const create${name}Fail = (error) => ({
    type: CREATE_${name?.toUpperCase()}_FAIL,
    payload: error,
  });
  
  export const get${name}Detail = (${name?.toLowerCase()}Id) => ({
    type: GET_${name?.toUpperCase()}_DETAILS,
    payload: ${name?.toLowerCase()}Id,
  });
  
  export const update${name} = (${name?.toLowerCase()}, ${name?.toLowerCase()}Id, history) => ({
    type: UPDATE_${name?.toUpperCase()},
    payload: { ${name?.toLowerCase()}, ${name?.toLowerCase()}Id, history },
  });
  
  export const update${name}Success = (${name?.toLowerCase()}) => ({
    type: UPDATE_${name?.toUpperCase()}_SUCCESS,
    payload: ${name?.toLowerCase()},
  });
  
  export const update${name}Fail = (error) => ({
    type: UPDATE_${name?.toUpperCase()}_FAIL,
    payload: error,
  });
  
  export const delete${name} = (${name?.toLowerCase()}Id, history) => ({
    type: DELETE_${name?.toUpperCase()},
    payload: { ${name?.toLowerCase()}Id, history },
  });
  
  export const delete${name}Success = (${name?.toLowerCase()}) => ({
    type: DELETE_${name?.toUpperCase()}_SUCCESS,
    payload: ${name?.toLowerCase()},
  });
  
  export const delete${name}Fail = (error) => ({
    type: DELETE_${name?.toUpperCase()}_FAIL,
    payload: error,
  });
  `;

const reducerTemplate = (name) => `
import {
  GET_${name?.toUpperCase()}S,
  GET_${name?.toUpperCase()}S_SUCCESS,
  GET_${name?.toUpperCase()}S_FAIL,
  GET_${name?.toUpperCase()}_DETAILS,
  GET_${name?.toUpperCase()}_DETAILS_SUCCESS,
  GET_${name?.toUpperCase()}_DETAILS_FAIL,
  CREATE_${name?.toUpperCase()},
  CREATE_${name?.toUpperCase()}_SUCCESS,
  CREATE_${name?.toUpperCase()}_FAIL,
  UPDATE_${name?.toUpperCase()},
  UPDATE_${name?.toUpperCase()}_SUCCESS,
  UPDATE_${name?.toUpperCase()}_FAIL,
  DELETE_${name?.toUpperCase()},
  DELETE_${name?.toUpperCase()}_SUCCESS,
  DELETE_${name?.toUpperCase()}_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  ${name?.toLowerCase()}s: {
    ${name?.toLowerCase()}s: [],
    total: "",
    page: "",
  },
  ${name?.toLowerCase()}Details: {},
  error: {},
  loading: false,
};

const ${name} = (state = INIT_STATE, action) => {
  switch (action.type) {
    // ${name} - This line cannot be edited or removed
    case GET_${name?.toUpperCase()}S:
    case GET_${name?.toUpperCase()}_DETAILS:
    case CREATE_${name?.toUpperCase()}:
    case UPDATE_${name?.toUpperCase()}:
    case DELETE_${name?.toUpperCase()}:
      return {
        ...state,
        loading: true,
      };

    case DELETE_${name?.toUpperCase()}_FAIL:
    case GET_${name?.toUpperCase()}S_FAIL:
    case GET_${name?.toUpperCase()}_DETAILS_FAIL:
    case UPDATE_${name?.toUpperCase()}_FAIL:
    case CREATE_${name?.toUpperCase()}_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_${name?.toUpperCase()}S_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: action.payload,
        error: {},
        loading: false,
      };

    case GET_${name?.toUpperCase()}_DETAILS_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}Details: action.payload,
        error: {},
        loading: false,
      };

    case CREATE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: [...state.${name?.toLowerCase()}s.${name?.toLowerCase()}s, action.payload],
          total: state.${name?.toLowerCase()}s.total + 1,
        },
        ${name?.toLowerCase()}Details: action.payload,
        error: {},
        loading: false,
      };

    case UPDATE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: state.${name?.toLowerCase()}s.${name?.toLowerCase()}s.map((${name?.toLowerCase()}) =>
            ${name?.toLowerCase()}._id === action.payload._id
              ? { ...${name?.toLowerCase()}, ...action.payload }
              : ${name?.toLowerCase()}
          ),
        },
        ${name?.toLowerCase()}Details: action.payload,
        loading: false,
        error: {},
      };

    case DELETE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: state.${name?.toLowerCase()}s.${name?.toLowerCase()}s.filter(
            (${name?.toLowerCase()}) => ${name?.toLowerCase()}._id !== action.payload._id
          ),
        },
        error: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default ${name};
`;

const reducerTemplateBundle = (name) => {
  const importSection = ` GET_${name?.toUpperCase()}S,
  GET_${name?.toUpperCase()}S_SUCCESS,
  GET_${name?.toUpperCase()}S_FAIL,
  GET_${name?.toUpperCase()}_DETAILS,
  GET_${name?.toUpperCase()}_DETAILS_SUCCESS,
  GET_${name?.toUpperCase()}_DETAILS_FAIL,
  CREATE_${name?.toUpperCase()},
  CREATE_${name?.toUpperCase()}_SUCCESS,
  CREATE_${name?.toUpperCase()}_FAIL,
  UPDATE_${name?.toUpperCase()},
  UPDATE_${name?.toUpperCase()}_SUCCESS,
  UPDATE_${name?.toUpperCase()}_FAIL,
  DELETE_${name?.toUpperCase()},
  DELETE_${name?.toUpperCase()}_SUCCESS,
  DELETE_${name?.toUpperCase()}_FAIL,`;

  const stateSection = `
  ${name?.toLowerCase()}s: {
    ${name?.toLowerCase()}s: [],
    total: "",
    page: "",
  },
  ${name?.toLowerCase()}Details: {},
  `;

  const reducerSection = `
  // ${name} - This line cannot be edited or removed
    case GET_${name?.toUpperCase()}S:
    case GET_${name?.toUpperCase()}_DETAILS:
    case CREATE_${name?.toUpperCase()}:
    case UPDATE_${name?.toUpperCase()}:
    case DELETE_${name?.toUpperCase()}:
      return {
        ...state,
        loading: true,
      };

    case DELETE_${name?.toUpperCase()}_FAIL:
    case GET_${name?.toUpperCase()}S_FAIL:
    case GET_${name?.toUpperCase()}_DETAILS_FAIL:
    case UPDATE_${name?.toUpperCase()}_FAIL:
    case CREATE_${name?.toUpperCase()}_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_${name?.toUpperCase()}S_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: action.payload,
        error: {},
        loading: false,
      };

    case GET_${name?.toUpperCase()}_DETAILS_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}Details: action.payload,
        error: {},
        loading: false,
      };

    case CREATE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: [...state.${name?.toLowerCase()}s.${name?.toLowerCase()}s, action.payload],
          total: state.${name?.toLowerCase()}s.total + 1,
        },
        ${name?.toLowerCase()}Details: action.payload,
        error: {},
        loading: false,
      };

    case UPDATE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: state.${name?.toLowerCase()}s.${name?.toLowerCase()}s.map((${name?.toLowerCase()}) =>
            ${name?.toLowerCase()}._id === action.payload._id
              ? { ...${name?.toLowerCase()}, ...action.payload }
              : ${name?.toLowerCase()}
          ),
        },
        ${name?.toLowerCase()}Details: action.payload,
        loading: false,
        error: {},
      };

    case DELETE_${name?.toUpperCase()}_SUCCESS:
      return {
        ...state,
        ${name?.toLowerCase()}s: {
          ...state.${name?.toLowerCase()}s,
          ${name?.toLowerCase()}s: state.${name?.toLowerCase()}s.${name?.toLowerCase()}s.filter(
            (${name?.toLowerCase()}) => ${name?.toLowerCase()}._id !== action.payload._id
          ),
        },
        error: {},
        loading: false,
      };
  `;

  return {
    importSection,
    stateSection,
    reducerSection,
  };
};

const sagaTemplate = (name) => `
import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_${name?.toUpperCase()}S,
  GET_${name?.toUpperCase()}_DETAILS,
  CREATE_${name?.toUpperCase()},
  UPDATE_${name?.toUpperCase()},
  DELETE_${name?.toUpperCase()},
} from "./actionTypes";
import {
  get${name}sFail,
  get${name}sSuccess,
  get${name}DetailsSuccess,
  get${name}DetailsFail,
  create${name}Fail,
  create${name}Success,
  update${name}Success,
  update${name}Fail,
  delete${name}Success,
  delete${name}Fail,
} from "./actions";

import { get, post, ApiPut, del } from "helpers/api_helper";
import { Notification } from "../../components/Common/Notification";

// ${name} - This line cannot be edited or removed
function get${name}sAPi({ page, sort, limit, searchText }) {
  return get(
    \`/${name?.toLowerCase()}/admin/all/?sort=\${sort}&page=\${page ? page : 1}&limit=\${
      limit ? limit : 10
    }&search=\${searchText}\`
  );
}

const get${name}DetailsAPi = (${name?.toLowerCase()}Id) => {
  return get(\`/${name?.toLowerCase()}/admin/single/\${${name?.toLowerCase()}Id}\`);
};

const create${name}Api = ({ ${name?.toLowerCase()} }) => {
  return post("/${name?.toLowerCase()}/admin/new", ${name?.toLowerCase()});
};

const update${name}Api = ({ ${name?.toLowerCase()}, ${name?.toLowerCase()}Id }) => {
  return ApiPut(\`/${name?.toLowerCase()}/admin/\${${name?.toLowerCase()}Id}\`, ${name?.toLowerCase()});
};

const delete${name}Api = ({ ${name?.toLowerCase()}Id }) => {
  return del(\`/${name?.toLowerCase()}/admin/\${${name?.toLowerCase()}Id}\`);
}

function* fetch${name}s({ payload }) {
  try {
    const response = yield call(get${name}sAPi, payload);
    yield put(get${name}sSuccess(response));
  } catch (error) {
    yield put(get${name}sFail(error));
  }
}

function* fetch${name}Details({ payload: ${name?.toLowerCase()}Id }) {
  try {
    const response = yield call(get${name}DetailsAPi, ${name?.toLowerCase()}Id);
    yield put(get${name}DetailsSuccess(response));
  } catch (error) {
    yield put(get${name}DetailsFail(error));
  }
}

function* onCreate${name}({ payload }) {
  try {
    const response = yield call(create${name}Api, payload);
    if (response?.message) {
      Notification({
        type: "error",
        message: response?.message,
        title: "",
      });
    } else if (response) {
      yield put(create${name}Success(response));
      payload?.history?.push("/${name?.toLowerCase()}s");
      doneNotification("${name} Created Successfully!");
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      Notification({
        type: "error",
        message: error?.response?.data?.message,
        title: "",
      });
    }
    if (error?.response?.status === 413) {
      Notification({
        type: "error",
        message: "file size is Too Large",
        title: "",
      });
    }
    yield put(create${name}Fail(error));
  }
}

function* onUpdate${name}({ payload }) {
  try {
    const response = yield call(update${name}Api, payload);
    if (response) {
      Notification({
        type: "success",
        message: "${name} Updated Successfully!",
        title: "",
      });
      yield put(update${name}Success(response));
      if (payload.history) {
        payload.history.push("/${name?.toLowerCase()}s");
      }
    }
  } catch (error) {
    if (error.response?.data?.message) {
      Notification({
        type: "error",
        message: error.response?.data?.message,
        title: "",
      });
    }
    if (error?.response?.status === 413) {
      Notification({
        type: "error",
        message: "file size is Too Large",
        title: "",
      });
    }
    yield put(update${name}Fail(error.response.data));
  }
}

function* onDelete${name}({ payload }) {
  try {
    const response = yield call(delete${name}Api, ${name}Id);
    yield put(delete${name}Success(response));
    Notification({
      type: "success",
      message: "${name} Deleted Successfully!",
      title: "",
    });
  } catch (error) {
    if (error?.response?.data?.message) {
      Notification({
        type: "error",
        message: error?.response?.data?.message,
        title: "",
      });
    }
    yield put(delete${name}Fail(error?.response?.data));
  }
}

function* ${name?.toLowerCase()}Saga() {
  yield takeEvery(GET_${name?.toUpperCase()}S, fetch${name}s);
  yield takeEvery(GET_${name?.toUpperCase()}_DETAILS, fetch${name}Details);
  yield takeEvery(CREATE_${name?.toUpperCase()}, onCreate${name});
  yield takeEvery(UPDATE_${name?.toUpperCase()}, onUpdate${name});
  yield takeEvery(DELETE_${name?.toUpperCase()}, onDelete${name});
}

export default ${name?.toLowerCase()}Saga;

function doneNotification(message) {
  Notification({
    type: "success",
    message: message,
    title: "",
  });
}
`;

const sagaTemplateBundle = (name) => {
  const importSection = `
  GET_${name?.toUpperCase()}S,
  GET_${name?.toUpperCase()}_DETAILS,
  CREATE_${name?.toUpperCase()},
  UPDATE_${name?.toUpperCase()},
  DELETE_${name?.toUpperCase()},`;

  const importActionSection = `
  get${name}sFail,
  get${name}sSuccess,
  get${name}DetailsSuccess,
  get${name}DetailsFail,
  create${name}Fail,
  create${name}Success,
  update${name}Success,
  update${name}Fail,
  delete${name}Success,
  delete${name}Fail,
  `;

  const sagaContent = `
  // ${name} - This line cannot be edited or removed
function get${name}sAPi({ page, sort, limit, searchText }) {
  return get(
    \`/${name?.toLowerCase()}/admin/all/?sort=\${sort}&page=\${page ? page : 1}&limit=\${
      limit ? limit : 10
    }&search=\${searchText}\`
  );
}

const get${name}DetailsAPi = (${name}Id) => {
  return get(\`/${name?.toLowerCase()}/admin/single/\${${name}Id}\`);
};

const create${name}Api = ({ ${name?.toLowerCase()} }) => {
  return post("/${name?.toLowerCase()}/admin/new", ${name?.toLowerCase()});
};

const update${name}Api = ({ ${name?.toLowerCase()}, ${name}Id }) => {
  return ApiPut(\`/${name?.toLowerCase()}/admin/\${${name}Id}\`, ${name?.toLowerCase()});
};

const delete${name}Api = (${name}Id) => {
  return del(\`/${name?.toLowerCase()}/admin/\${${name}Id}\`);
}

function* fetch${name}s({ payload }) {
  try {
    const response = yield call(get${name}sAPi, payload);
    yield put(get${name}sSuccess(response));
  } catch (error) {
    yield put(get${name}sFail(error));
  }
}

function* fetch${name}Details({ payload: ${name}Id }) {
  try {
    const response = yield call(get${name}DetailsAPi, ${name}Id);
    yield put(get${name}DetailsSuccess(response));
  } catch (error) {
    yield put(get${name}DetailsFail(error));
  }
}

function* onCreate${name}({ payload }) {
  try {
    const response = yield call(create${name}Api, payload);
    if (response?.message) {
      Notification({
        type: "error",
        message: response?.message,
        title: "",
      });
    } else if (response) {
      yield put(create${name}Success(response));
      payload?.history?.push("/${name?.toLowerCase()}s");
      doneNotification("${name} Created Successfully!");
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      Notification({
        type: "error",
        message: error?.response?.data?.message,
        title: "",
      });
    }
    if (error?.response?.status === 413) {
      Notification({
        type: "error",
        message: "file size is Too Large",
        title: "",
      });
    }
    yield put(create${name}Fail(error));
  }
}

function* onUpdate${name}({ payload }) {
  try {
    const response = yield call(update${name}Api, payload);
    if (response) {
      Notification({
        type: "success",
        message: "${name} Updated Successfully!",
        title: "",
      });
      yield put(update${name}Success(response));
      if (payload.history) {
        payload.history.push("/${name?.toLowerCase()}s");
      }
    }
  } catch (error) {
    if (error.response?.data?.message) {
      Notification({
        type: "error",
        message: error.response?.data?.message,
        title: "",
      });
    }
    if (error?.response?.status === 413) {
      Notification({
        type: "error",
        message: "file size is Too Large",
        title: "",
      });
    }
    yield put(update${name}Fail(error.response.data));
  }
}

function* onDelete${name}({ ${name}Id, history }) {
  try {
    const response = yield call(delete${name}Api, ${name}Id);
    yield put(delete${name}Success(response));
    Notification({
      type: "success",
      message: "${name} Deleted Successfully!",
      title: "",
    });
    history.goBack();
  } catch (error) {
    if (error?.response?.data?.message) {
      Notification({
        type: "error",
        message: error?.response?.data?.message,
        title: "",
      });
    }
    yield put(delete${name}Fail(error?.response?.data));
  }
}`;

  const sagaExport = `
yield takeEvery(GET_${name?.toUpperCase()}S, fetch${name}s);
yield takeEvery(GET_${name?.toUpperCase()}_DETAILS, fetch${name}Details);
yield takeEvery(CREATE_${name?.toUpperCase()}, onCreate${name});
yield takeEvery(UPDATE_${name?.toUpperCase()}, onUpdate${name});
yield takeEvery(DELETE_${name?.toUpperCase()}, onDelete${name});
`;

  return {
    importSection,
    importActionSection,
    sagaContent,
    sagaExport,
  };
};

module.exports = {
  actionTypesTemplate,
  reduxIndexTemplate,
  actionCreatorsTemplate,
  reducerTemplate,
  sagaTemplate,
  reducerTemplateBundle,
  sagaTemplateBundle,
};
