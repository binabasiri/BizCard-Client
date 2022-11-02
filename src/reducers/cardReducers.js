export const cardInfoReducer = (state = { card: {} }, action) => {
	switch (action.type) {
		case "CARD_REQUEST":
			return { loading: true, card: {} };

		case "CARD_SUCCESS":
			return { loading: false, card: action.payload };

		case "CARD_FAIL":
			return { loading: false, error: action.payload, card: {} };

		default:
			return state;
	}
};
