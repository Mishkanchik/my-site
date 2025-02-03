export const ADD_ROLE = "ADD_ROLE";
export const REMOVE_ROLE = "REMOVE_ROLE";
export const SET_ROLES = "SET_ROLES";

export const addRole = (role) => ({
	type: ADD_ROLE,
	payload: role,
});

export const removeRole = (role) => ({
	type: REMOVE_ROLE,
	payload: role,
});

export const setRoles = (roles) => ({
	type: SET_ROLES,
	payload: roles,
});
