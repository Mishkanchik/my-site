import { ADD_ROLE, REMOVE_ROLE, SET_ROLES } from "./rolesAction.js";

const initialState = {
	roles: [],
};

const roleReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ROLES:
			return { ...state, roles: action.payload };
		case ADD_ROLE:
			return { ...state, roles: [...state.roles, action.payload] };
		case REMOVE_ROLE:
			return { ...state, roles: state.roles.filter((role) => role !== action.payload) };
		default:
			return state;
	}
};

export default roleReducer;
