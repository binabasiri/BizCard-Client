import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cardInfoReducer } from "./reducers/cardReducers";
import {
	userLoginReducer,
	userDetailReducer,
	userCardsReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
	cardInfo: cardInfoReducer,
	userLogin: userLoginReducer,
	userDetail: userDetailReducer,
	userCards: userCardsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleWare = [thunk];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
