import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Layout } from "./layouts/Layouts";
import { Products } from "./components/Products";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/detail" element={<ProductDetail />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
