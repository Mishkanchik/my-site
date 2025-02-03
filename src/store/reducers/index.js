import {combineReducers} from "@reduxjs/toolkit";
import roleReducer from "./rolesReducer"
export const rootReducer = combineReducers({
    roles: roleReducer
})