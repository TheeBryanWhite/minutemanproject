import { types } from "../constants/types";
const initialState = {
	accessToken: null,
	refreshToken: null
};

const tokenreducer = (state = initialState, action) => {
  switch (action.type) {

	case types.SET_ACCESS_TOKEN:
		return { 
			...state, 
			accessToken: action.payload
	}

	case types.SET_REFRESH_TOKEN:
		return { 
			...state, 
			refreshToken: action.payload
	}
      
	default:
		return {
			...state
		}
	}
};

export default tokenreducer;