import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: "USER_LOGIN_REGISTER_REQUEST" });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await axios.post(
			`/api/users/login`,
			{ email, password },
			config
		);
		dispatch({
			type: "USER_LOGIN_REGISTER_SUCCESS",
			payload: response.data,
		});

		localStorage.setItem("userInfo", JSON.stringify(response.data));
	} catch (error) {
		dispatch({
			type: "USER_LOGIN_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const logoutUser = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({
		type: "USER_LOGOUT",
	});
};

export const registerUser = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: "USER_LOGIN_REGISTER_REQUEST" });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const response = await axios.post(
			`/api/users/register`,
			{ email, password },
			config
		);
		dispatch({
			type: "USER_LOGIN_REGISTER_SUCCESS",
			payload: response.data,
		});

		localStorage.setItem("userInfo", JSON.stringify(response.data));
	} catch (error) {
		dispatch({
			type: "USER_REGISTER_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const getUserDetail = () => async (dispatch, getState) => {
	try {
		dispatch({ type: "USER_DETAIL_REQUEST" });

		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		const response = await axios.get(`/api/users/profile`, config);
		dispatch({
			type: "USER_DETAIL_SUCCESS",
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: "USER_DETAIL_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

const getCardInfoWithID = async (id, config) => {
	const response = await axios.get(`/api/cards/cardbyid/${id}`);
	return response.data;
};

export const getUserCards = (cardIDs) => async (dispatch, getState) => {
	dispatch({ type: "USER_CARDS_REQUEST" });

	const { userLogin } = getState();

	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userLogin.userInfo.token}`,
		},
	};

	const cardRequests = [];
	cardIDs.forEach((id) => {
		cardRequests.push(getCardInfoWithID(id.cardId, config));
	});

	Promise.all(cardRequests)
		.then((allCardData) => {
			dispatch({
				type: "USER_CARDS_SUCCESS",
				payload: allCardData,
			});
		})
		.catch((error) => {
			dispatch({
				type: "USER_CARDS_FAIL",
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.response,
			});
		});
};

export const addToUserCards = (cardData) => async (dispatch, getState) => {
	try {
		dispatch({ type: "USER_ADDCARD_REQUEST" });

		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		const response = await axios.post(`/api/cards/new`, cardData, config);
		dispatch({
			type: "USER_ADDCARD_SUCCESS",
			payload: response.data.addedCard,
		});
	} catch (error) {
		dispatch({
			type: "USER_ADDCARD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const deleteFromUserCards = (cardid) => async (dispatch, getState) => {
	try {
		dispatch({ type: "USER_DELETECARD_REQUEST" });

		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		await axios.delete(`/api/cards/delete/${cardid}`, config);
		dispatch({
			type: "USER_DELETECARD_SUCCESS",
			payload: cardid,
		});
	} catch (error) {
		dispatch({
			type: "USER_DELETECARD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};

export const editFromUserCards = (cardNewData, _id) => async (dispatch, getState) => {
	try {
		dispatch({ type: "USER_EDITCARD_REQUEST" });

		const { userLogin } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userLogin.userInfo.token}`,
			},
		};

		const response = await axios.put(`/api/cards/edit/${_id}`, cardNewData, config);
		dispatch({
			type: "USER_EDITCARD_SUCCESS",
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: "USER_EDITCARD_FAIL",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.response,
		});
	}
};
