import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
			<div className="text-lg font-bold">News24</div>
			<div className="space-x-4">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`px-3 py-1 rounded transition ${
							isActive ? "bg-blue-800" : "hover:bg-blue-500"
						}`
					}
				>
					News
				</NavLink>
				<NavLink
					to="/login"
					className={({ isActive }) =>
						`px-3 py-1 rounded transition ${
							isActive ? "bg-blue-800" : "hover:bg-blue-500"
						}`
					}
				>
					Login
				</NavLink>
			</div>
		</nav>
	);
}
