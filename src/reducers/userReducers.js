export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case "USER_LOGIN_REGISTER_REQUEST":
			return { loading: true };

		case "USER_LOGIN_REGISTER_SUCCESS":
			return { loading: false, userInfo: action.payload };

		case "USER_LOGIN_FAIL":
			return { loading: false, loginError: action.payload, userInfo: {} };

		case "USER_REGISTER_FAIL":
			return { loading: false, registerError: action.payload, userInfo: {} };
		case "USER_LOGOUT":
			return {};
		default:
			return state;
	}
};

export const userDetailReducer = (state = { user: null }, action) => {
	switch (action.type) {
		case "USER_DETAIL_REQUEST":
			return { loading: true, ...state };

		case "USER_DETAIL_SUCCESS":
			return { loading: false, user: action.payload };

		case "USER_DETAIL_FAIL":
			return { loading: false, error: action.payload, user: null };

		case "USER_LOGOUT":
			return {};
		default:
			return state;
	}
};

export const userCardsReducer = (state = { cards: null }, action) => {
	switch (action.type) {
		case "USER_CARDS_REQUEST":
			return { ...state, loading: true };

		case "USER_CARDS_SUCCESS":
			return { loading: false, cards: action.payload, POSTerror: null };

		case "USER_CARDS_FAIL":
			return { loading: false, GETerror: action.payload, cards: [] };
		case "USER_ADDCARD_REQUEST":
			return { ...state, loading: true };

		case "USER_ADDCARD_SUCCESS":
			return { loading: false, cards: [...state.cards, action.payload] };

		case "USER_ADDCARD_FAIL":
			return { ...state, loading: false, POSTerror: action.payload };
		case "USER_DELETECARD_REQUEST":
			return { ...state, loading: true };

		case "USER_DELETECARD_SUCCESS":
			const newCards = state.cards.filter((card) => {
				return card._id !== action.payload;
			});
			return { loading: false, cards: newCards };
		case "USER_DELETECARD_FAIL":
			return { ...state, loading: false, DELETEerror: action.payload };
		case "USER_EDITCARD_REQUEST":
			return { ...state, loading: true };

		case "USER_EDITCARD_SUCCESS":
			const newEditedCards = state.cards.filter((card) => {
				return card._id !== action.payload._id;
			});
			newEditedCards.push(action.payload);
			return { loading: false, cards: newEditedCards };
		case "USER_EDITCARD_FAIL":
			return { ...state, loading: false, EDITerror: action.payload };
		case "USER_LOGOUT":
			return {};
		default:
			return state;
	}
};
