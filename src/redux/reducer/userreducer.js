import { types } from "../constants/types";
const initialState = {
	isEmailVerified: false,
	username: null,
};

const userreducer = (state = initialState, action) => {
  switch (action.type) {
	case types.SET_EMAIL_VERIFIED:
		return { 
			...state, 
			isEmailVerified: action.payload
	}

	case types.SET_USERNAME:
		return { 
			...state, 
			username: action.payload
	}
      
	default:
		return {
			...state
		}
  }
};

export default userreducer;