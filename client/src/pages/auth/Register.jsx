import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../layouts/Layouts";
import { userRegisterAction } from "../../Redux/Actions/User";

export default function Register() {
	const [email, setEmail] = useState(null);
	const [name, setName] = useState(null);
	const [password, setPassword] = useState(null);

	const userRegisterReducer = useSelector((state) => state.userRegisterReducer);
	const { loading, error, userInfo } = userRegisterReducer;

	const dispatch = useDispatch();
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(userRegisterAction(name, email, password));
	};
	return (
		<>
			<Layout>
				{loading ? (
					<div className="flex justify-center min-h-screen">
						<div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
					</div>
				) : error ? (
					<h1>{error}</h1>
				) : (
					<>
						<form className="max-w-sm mx-auto h-5/6" onSubmit={submitHandler}>
							<div className="mb-5">
								<label
									for="text"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Name
								</label>
								<input
									type="text"
									id="text"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="username"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="mb-5">
								<label
									for="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your email
								</label>
								<input
									type="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="name@example.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-5">
								<label
									for="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Your password
								</label>
								<input
									type="password"
									id="password"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								type="submit"
								className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								Register
							</button>
						</form>
					</>
				)}
			</Layout>
		</>
	);
}
