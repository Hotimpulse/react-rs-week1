import { combineReducers } from 'redux';
import formDataReducer from '../formDataSlice';

const rootReducer = combineReducers({
  formData: formDataReducer,
});

export default rootReducer;
