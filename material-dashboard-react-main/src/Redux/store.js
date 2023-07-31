// 2nd step to create reducer
import { createStore, combineReducers, applyMiddleware } from "redux";
import UserReducer from "./userReducer";
import thunkMiddleWare from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// store main reducers sy pass hony wala data save krna
const rootReducer = combineReducers({
  users: UserReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleWare)));

export default store;
