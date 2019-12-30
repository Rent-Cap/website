import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  zip: "",
  refund: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CHANGE_ZIP":
      return Object.assign({}, state, {
        zip: action.zip
      });
    case "CHANGE_REFUND":
      return Object.assign({}, state, {
        refund: action.refund
      });
    default:
      return state;
  }
}

const initStore = () => {
  const windowGlobal = typeof window !== "undefined" && window;

  const devtools =
    process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f;

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk),
      devtools
    )
  );

  return store;
};

export default initStore;
