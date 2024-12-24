import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../Redux/Actions/Product";
export const Products = () => {
	const dispatch = useDispatch();
	const productListReducer = useSelector((state) => state.productListReducer);
	const { loading, error, products, page, totalPages } = productListReducer;

	useEffect(() => {
		dispatch(productListAction());
	}, [dispatch]);

	return (
		<div>
			{loading ? (
				<h1>loading</h1>
			) : error ? (
				<h1>{error}</h1>
			) : (
				<>
					<section class="text-gray-600 body-font">
						<div class="container px-5 py-24 mx-auto">
							<div class="flex flex-wrap -m-4">
								{products.map((product) => (
									<div class="p-4 lg:w-1/4 md:w-1/2" key={product.id}>
										<div class="bg-white">
											<div class="max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
												<div class="mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
													<div class="group relative">
														<img
															src={product.image}
															alt="Front of men&#039;s Basic Tee in black."
															class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
														/>
														<div class="mt-4 flex justify-between">
															<div>
																<h3 class="text-sm text-gray-700">
																	<a href="#">
																		<span
																			aria-hidden="true"
																			class="absolute inset-0"
																		></span>
																		Basic Tee
																	</a>
																</h3>
																<p class="mt-1 text-sm text-gray-500">Black</p>
															</div>
															<p class="text-sm font-medium text-gray-900">
																$35
															</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>
				</>
			)}
		</div>
	);
};
