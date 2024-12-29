import { BASE_URL } from "../Constants/BASE_URL";
import { CLEAR_CART } from "../Constants/Cart";
import {
	ORDER_REQ,
	ORDER_RESET,
	ORDER_FAIL,
	ORDER_SUCCESS,
	ORDER_DETAIL_REQ,
	ORDER_DETAIL_REQ_FAIL,
	ORDER_DETAIL_REQ_SUCCESS,
	ORDER_PAYMENT_REQ,
	ORDER_PAYMENT_REQ_FAIL,
	ORDER_PAYMENT_REQ_SUCCESS,
	ORDER_LIST_REQ,
	ORDER_LIST_REQ_FAIL,
	ORDER_LIST_REQ_SUCCESS,
} from "../Constants/Order";
import axios from "axios";
import { userLogoutAction } from "./User";

//Order action
export const orderAction = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_REQ });
		const userInfo = getState().userLoginReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`${BASE_URL}/api/orders`, order, config);

		dispatch({ type: ORDER_SUCCESS, payload: data });
		dispatch({ type: CLEAR_CART, payload: data });
		// localStorage.setItem("cartItems", JSON.stringify([]));
	} catch (error) {
		console.log(error);
	}
};

//Order Payment action
export const orderPaymentAction =
	(orderId, paymentResult) => async (dispatch, getState) => {
		try {
			dispatch({ type: ORDER_PAYMENT_REQ });

			const userInfo = getState().userLoginReducer.userInfo;
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.put(
				`${BASE_URL}/api/orders/${orderId}/payment`,
				paymentResult,
				config
			);

			dispatch({ type: ORDER_PAYMENT_REQ_SUCCESS, payload: data });
			dispatch(orderDetailAction(orderId));
		} catch (error) {
			const message =
				error.response && error.response.data.message
					? error.response.data.message
					: error.message;

			if (message === "Not authorized!") dispatch(userLogoutAction());
			dispatch({ type: ORDER_PAYMENT_REQ_FAIL, payload: message });
		}
	};

//Order Detail action
export const orderDetailAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAIL_REQ });

		const userInfo = getState().userLoginReducer.userInfo;
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`${BASE_URL}/api/orders/${id}`, config);

		dispatch({ type: ORDER_DETAIL_REQ_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized!") dispatch(userLogoutAction());
		dispatch({ type: ORDER_DETAIL_REQ_FAIL, payload: message });
	}
};

//Order List action
export const orderListAction = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQ });

		const userInfo = getState().userLoginReducer.userInfo;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		console.log("inside order list", config);
		const { data } = await axios.get(`${BASE_URL}/api/orders/`, config);
		console.log(data);
		dispatch({ type: ORDER_LIST_REQ_SUCCESS, payload: data });
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message;
		if (message === "Not authorized!") dispatch(userLogoutAction());
		dispatch({ type: ORDER_LIST_REQ_FAIL, payload: message });
	}
};
