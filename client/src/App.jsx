import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { useSelector } from "react-redux";
import Checkout from "./pages/Checkout";
function App() {
	const userLoginReducer = useSelector((state) => state.userLoginReducer);
	const { userInfo } = userLoginReducer;
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/products/:id" element={<ProductDetail />} />
					<Route
						exact
						path="/login"
						element={userInfo ? <Navigate to="/" /> : <Login />}
					/>
					<Route
						exact
						path="/register"
						element={userInfo ? <Navigate to="/" /> : <Register />}
					/>
					<Route exact path="/checkout" element={<Checkout />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
