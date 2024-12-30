"use client";

import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

export function UserDropdown({ userName, logoutHandler }) {
	return (
		<Dropdown label={userName} dismissOnClick={false}>
			<Link to="/order-history">
				<Dropdown.Item>Order History</Dropdown.Item>
			</Link>
			<Dropdown.Item onClick={logoutHandler}>Sign Out</Dropdown.Item>
		</Dropdown>
	);
}
