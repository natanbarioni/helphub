import { combineReducers } from "redux";

import editReducer from "./edit/reducer";

const rootReducer = combineReducers({ editReducer });

export default rootReducer;
