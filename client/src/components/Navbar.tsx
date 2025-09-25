import { NavLink } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";

export default function Navbar() {
	const user = useUserStore((state) => state.user);

	const [hasPrebid, setHasPrebid] = useState(false);

  useEffect(() => {
    const handler = () => setHasPrebid(true);
    window.addEventListener('prebid-ready', handler);

    return () => window.removeEventListener('prebid-ready', handler);
  }, []);

	return (
		<nav className="flex space-x-4">
			{hasPrebid && <NavLink
				to="/prebitlogs"
				className={({ isActive }) =>
					`px-3 py-1 rounded transition ${
						isActive ? "bg-blue-800" : "hover:bg-blue-500"
					}`
				}
			>
				Prebit logs
			</NavLink>}
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
