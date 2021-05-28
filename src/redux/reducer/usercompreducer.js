import { types } from "../constants/types";
const initialState = {
	userCompData: null,
};

const usercompreducer = (state = initialState, action) => {
  switch (action.type) {
	case types.SET_USER_COMP_DATA:
		return { 
			...state, 
			userCompData: action.payload
	}
      
	default:
		return {
			...state
		}
  }
};

export default usercompreducer;