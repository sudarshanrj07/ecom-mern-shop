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
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/products/:id" element={<ProductDetail />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
