import { combineReducers } from 'redux';
import tokenreducer from './tokenreducer';
import userreducer from './userreducer';
import usercompreducer from './usercompreducer';
export default combineReducers(
	{
		tokenreducer,
		userreducer,
		usercompreducer
	}
)