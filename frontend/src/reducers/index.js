import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./authReducers";
import {
  tankCreateReducer,
  tankDeleteReducer,
  tankDetailsReducer,
  tankListByUserReducer,
  tankListReducer,
  tankUpdateReducer,
} from "./tankReducers";

const reducer = combineReducers({
  login: userLoginReducer,
  register: userRegisterReducer,
  currentUser: userDetailsReducer,
  tankList: tankListReducer,
  tankListByUser: tankListByUserReducer,
  tankDetails: tankDetailsReducer,
  tankDelete: tankDeleteReducer,
  tankCreate: tankCreateReducer,
  tankUpdate: tankUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  login: { userInfo: userInfoFromStorage },
  register: { userInfo: userInfoFromStorage },
  currentUser: { user: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
