import {
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_FROM_CART,
	CLEAR_CART,
	SAVE_PAYMENT_METHOD,
	SAVE_SHIPPING_ADDRESS,
} from "../Constants/Cart";

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			const item = action.payload;
			const existItem = state.cartItems.find(
				(cart) => cart.product === item.product
			);
			if (existItem) {
				return {
					...state,
					cartIems: state.cartItems.map((cart) => {
						return cart.product === existItem.product ? item : cart;
					}),
				};
			}

			return {
				...state,
				cartItems: [...state.cartItems, item],
			};

		case REMOVE_ITEM_FROM_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cart) => cart.product !== action.payload
				),
			};

		case CLEAR_CART:
			return {
				...state,
				cartItems: [],
			};

		case SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};

		case SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};

		default:
			state;
	}
};
