import { BASE_URL } from "../Constants/BASE_URL";
import {
	USER_LOGIN_REQ,
	USER_LOGIN_REQ_FAIL,
	USER_LOGIN_REQ_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQ,
	USER_REGISTER_SUCCESS,
} from "../Constants/User";
import axios from "axios";

export const userLoginAction = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQ });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await axios.get(
			`${BASE_URL}/api/users/login`,
			{ email, password },
			config
		);
		dispatch({ type: USER_LOGIN_REQ_SUCCESS, payload: data });
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (error) {}
};
