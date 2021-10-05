import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { AuthReducer } from "./Reducers/AuthReducer";
import { EventReducer } from "./Reducers/EventReducer";
import { ModalReducer } from "./Reducers/ModalReducer";

const reducer = combineReducers({
  modal: ModalReducer,
  calendar: EventReducer,
  auth: AuthReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
