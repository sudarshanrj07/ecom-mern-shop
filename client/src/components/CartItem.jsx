import { useDispatch } from "react-redux";
import { addToCartAction, removeFromCartAction } from "../Redux/Actions/Cart";

export default function CartItem({cartItems}) {
	const dispatch = useDispatch();
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCartAction(id));
	};

	const addToCartHandler = (id, quantity) => {
		dispatch(addToCartAction(id, quantity));
	};

	return (
		<>
			<div className="mt-8">
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-200">
						{cartItems.map((cart) => (
							<li key={cart.product} className="flex py-6">
								<div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
									<img
										alt={cart.imageAlt}
										src={cart.image}
										className="size-full object-cover"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900">
											<h3>
												<a href={cart.name}>{cart.name}</a>
											</h3>
											<p className="ml-4">${cart.price}</p>
										</div>
									</div>
									<div className="flex flex-1 items-end justify-between text-sm">
										<p className="text-gray-500">
											Qty{" "}
											<select
												value={cart.quantity}
												onChange={(e) =>
													addToCartHandler(cart.product, Number(e.target.value))
												}
												className="rounded ml-2 border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
											>
												{[...Array(cart.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</select>
										</p>

										<div className="flex">
											<button
												type="button"
												className="font-medium text-indigo-600 hover:text-indigo-500"
												onClick={() => removeFromCartHandler(cart.product)}
											>
												Remove
											</button>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
