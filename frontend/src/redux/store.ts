import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { alertReducer, AlertState } from "./reducers/alertReducer";
import { themeReducer, ThemeState } from "./reducers/themeReducer";
import { userReducer, userState } from "./reducers/userReducer";
import { fileReducer, FileState } from "./reducers/fileReducer";

export interface RootReducer {
  alert: AlertState;
  theme: ThemeState;
  auth: userState;
  file: FileState;
}

const rootReducer = combineReducers({
  alert: alertReducer,
  theme: themeReducer,
  auth: userReducer,
  file: fileReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
