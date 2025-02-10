export const USERS_LOAD = "USERS_LOAD";
export const USER_UPDATE = "USER_UPDATE";

export const loadUsers = () => {
	const localData = localStorage.getItem("user");
	if (localData) {
		return { type: USERS_LOAD, payload: JSON.parse(localData) };
	}
	return { type: USERS_LOAD, payload: null };
};

export const updateUser = (updatedFields) => {
	return { type: USER_UPDATE, payload: updatedFields };
};
