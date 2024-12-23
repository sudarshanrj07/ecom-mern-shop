import { Products } from "../../components/Products";
import {
	PRODUCT_DETAIL_REQ,
	PRODUCT_DETAIL_REQ_SUCCESS,
	PRODUCT_DETAIL_REQ_FAIL,
	PRODUCT_LIST_REQ,
	PRODUCT_LIST_REQ_FAIL,
	PRODUCT_LIST_REQ_SUCCESS,
} from "../Constants/Product";

//for list of Producst
export const ProductListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQ:
			return {
				loading: true,
				products: [],
			};
		case PRODUCT_LIST_REQ_SUCCESS:
			return {
				loading: false,
				products: action.payload.products,
				totalPage: action.payload.totalPage,
				page: action.payload.page,
			};
		case PRODUCT_LIST_REQ_FAIL:
			return {
				loading: false,
				errror: action.payload.errror,
			};

		default:
			return state;
	}
};

//for single Product Detail by id

export const ProductReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAIL_REQ:
			return {
				loading: true,
				...state,
			};
		case PRODUCT_DETAIL_REQ_SUCCESS:
			return {
				loading: false,
				products: action.payload,
			};
		case PRODUCT_DETAIL_REQ_FAIL:
			return {
				loading: false,
				errror: action.payload,
			};

		default:
			return state;
	}
};
