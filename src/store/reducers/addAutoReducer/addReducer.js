import { ADD_CAR, REMOVE_CAR, SET_CARS } from "./AddAction";

const initialState = {
	cars: [],
};

export const carReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CARS:
			return { ...state, cars: action.payload };

		case ADD_CAR:
			return { ...state, cars: [...state.cars, action.payload] };

		case REMOVE_CAR:
			return {
				...state,
				cars: state.cars.filter((car) => car.id !== action.payload),
			};

		default:
			return state;
	}
};
