import {combineReducers} from "@reduxjs/toolkit";
import rolesSlice from "../reducers/rolesReducer/index"
export const rootReducer = combineReducers({
    roles: rolesSlice
})