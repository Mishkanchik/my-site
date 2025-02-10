import { combineReducers } from "@reduxjs/toolkit";
import roleReducer from "./rolesReducer";
import userReducer from "./userReduser";
import { carReducer } from "./addAutoReducer/addReducer";

export const rootReducer = combineReducers({
	roles: roleReducer,
	user: userReducer,
	addAuto: carReducer,
});
