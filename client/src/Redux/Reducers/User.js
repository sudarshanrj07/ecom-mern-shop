import {
	USER_LOGIN_REQ,
	USER_LOGIN_REQ_FAIL,
	USER_LOGIN_REQ_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQ,
	USER_REGISTER_SUCCESS,
} from "../Constants/User";

//User login
export const userLoginReducer = (state = {}, action) => {
	switch (key) {
		case USER_LOGIN_REQ:
			return { loading: true };
		case USER_LOGIN_REQ_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_LOGIN_REQ_FAIL:
			return { loading: false, error: action.payload };
		case USER_LOGOUT:
			return {};

		default:
			return state;
	}
};

//User register
export const userRegisterReducer = (state = {}, action) => {
	switch (key) {
		case USER_REGISTER_REQ:
			return { loading: true };
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};
