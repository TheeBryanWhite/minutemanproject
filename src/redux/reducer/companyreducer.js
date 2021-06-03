import { types } from "../constants/types";
const initialState = {
	activeCompany: null,
};

const companyreducer = (state = initialState, action) => {
  switch (action.type) {
	case types.SET_ACTIVE_COMPANY:
		return { 
			...state, 
			activeCompany: action.payload
	}
      
	default:
		return {
			...state
		}
  }
};

export default companyreducer;