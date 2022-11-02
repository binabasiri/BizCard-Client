import axios from "axios";

export const getCardInfo = (urldId) => async (dispatch) => {
	try {
		dispatch({ type: "CARD_REQUEST" });
		const response = await axios.get(`/api/cards/${urldId}`);
		dispatch({
			type: "CARD_SUCCESS",
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: "CARD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};
