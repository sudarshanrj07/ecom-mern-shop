import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Layout } from "./layouts/Layouts";
import { Products } from "./components/Products";

function App() {
	return (
		<Layout>
			<Products></Products>
		</Layout>
	);
}

export default App;
