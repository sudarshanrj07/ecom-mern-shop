"use client";

import { Dropdown } from "flowbite-react";

export function UserDropdown({ logoutHandler }) {
	return (
		<Dropdown label="User" dismissOnClick={false}>
			<Dropdown.Item>Order History</Dropdown.Item>
			<Dropdown.Item onClick={logoutHandler}>Sign Out</Dropdown.Item>
		</Dropdown>
	);
}
