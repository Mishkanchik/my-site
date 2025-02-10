import { USERS_LOAD, USER_UPDATE } from "./actionUser";

const initialState = {
	user: {
		fullName: "",
		password: "",
		avatar:
			"https://pngcore.com/files/preview/960x960/11694532441f7xttwthhk686wgcagm71b84znfjy39usdvu0yrjfvlxflwlhmgbus0szosphh85sfhz9mkj6rorpkf9aozsmwxxfwg1chfkmzez.png",
	},
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case USERS_LOAD:
			return { ...state, user: action.payload || state.user };
		case USER_UPDATE:
			const updatedUser = { ...state.user, ...action.payload };
			localStorage.setItem("user", JSON.stringify(updatedUser));
			return { ...state, user: updatedUser };
		default:
			return state;
	}
};

export default userReducer;
