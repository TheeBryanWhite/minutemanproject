import { combineReducers } from 'redux';
import frontendreducer from './frontendreducer';
import tokenreducer from './tokenreducer';
import userreducer from './userreducer';
import usercompreducer from './usercompreducer';
export default combineReducers(
	{
		frontendreducer,
		tokenreducer,
		userreducer,
		usercompreducer
	}
)