import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

export default function Navbar() {
	const user = useUserStore((state) => state.user);
	return (
		<nav className="flex space-x-4">
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
			{user && <span className="p-1">Welcome, {user.name}</span>}
		</nav>
	);
}
