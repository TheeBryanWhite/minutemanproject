import { types } from "../constants/types";
const initialState = {
	pageTitle: 'Search The Rosters of the Battle of April 19th, 1775',
};

const frontendreducer = (state = initialState, action) => {
  switch (action.type) {
	case types.SET_PAGE_TITLE:
		return { 
			...state, 
			pageTitle: action.payload
	}
      
	default:
		return {
			...state
		}
  }
};

export default frontendreducer;